import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import CharacterImage from '@/app/components/svg/SVGColorChanger';
import { getHair, getHairColor, getSkinColor } from '@/app/utils/storageUtils';

interface Question {
  answer: string;
  isCorrect: boolean;
  hint?: string;
  route?: string;
}

interface DialogItem {
  speaker: string;
  text: string;
  image?: string;
  question?: Question[];
}

interface StoryItem {
  dialog: DialogItem[];
  images: {
    leftCharacter: string;
    rightCharacter: string;
    backgroundImg: string;
  }[];
  action?: {
    text: string;
    route: string;
  };
}

interface DialogData {
  story: StoryItem[];
}

interface DialogLayoutProps {
  dialogData: DialogData;
  actionButton?: React.ReactNode;
  onEnd: () => void;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({ dialogData, actionButton, onEnd }) => {
  const router = useRouter();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogItem[]>(dialogData.story[0].dialog);
  const [images, setImages] = useState(dialogData.story[0].images[0]);
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean; hint?: string }[]>([]);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [hideSpeechBubble, setHideSpeechBubble] = useState<boolean>(false);
  const [showActionButton, setShowActionButton] = useState<boolean>(false);
  const [selectedHair, setSelectedHair] = useState<string>('short-curly');
  const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
  const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');

  useEffect(() => {
    loadStoredValues();
  }, []);

  useEffect(() => {
    resetDialogState();
  }, [currentSceneIndex, dialogData.story]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActionButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentDialogIndex]);

  const loadStoredValues = useCallback(async () => {
    const storedHair = await getHair();
    if (storedHair) setSelectedHair(storedHair);

    const storedHairColorCode = await getHairColor();
    if (storedHairColorCode) setSelectedHairColorCode(storedHairColorCode);

    const storedSkinColorCode = await getSkinColor();
    if (storedSkinColorCode) setSelectedSkinColorCode(storedSkinColorCode);
  }, []);

  const resetDialogState = () => {
    const storyItem = dialogData.story[currentSceneIndex];
    setDialog(storyItem.dialog);
    setImages(storyItem.images[0]);
    setFeedback([]);
    setAttempts([]);
    setHideSpeechBubble(false);
    setShowActionButton(false);
  };

  const handleNext = () => {
    const currentDialogLength = dialog.length;
    if (currentDialogIndex < currentDialogLength - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
      setFeedback([]);
      setAttempts([]);
      setHideSpeechBubble(false);
      setShowActionButton(false);
    } else {
      if (currentSceneIndex + 1 < dialogData.story.length) {
        setCurrentSceneIndex(currentSceneIndex + 1);
        setCurrentDialogIndex(0);
      } else {
        onEnd();
      }
    }
  };

  const handleAnswerClick = (index: number, isCorrect: boolean, hint?: string) => {
    setFeedback((prev) => [...prev, { index, isCorrect, hint }]);
    if (!isCorrect) {
      setAttempts((prev) => [...prev, index]);
    } else {
      setHideSpeechBubble(true);
      const question = dialog[currentDialogIndex].question?.[index];
      if (question?.route) {
        const URL = question.route;
        setTimeout(() => router.push(URL), 1000);
      } else {
        setTimeout(handleNext, 1000);
      }
    }
  };

  const renderLeftImage = () => {
    if (images.leftCharacter === 'player' || images.leftCharacter === 'astro-player') {
      const type = images.leftCharacter === 'player' ? selectedHair : `astro-${selectedHair}`;
      return <CharacterImage color={selectedHairColorCode} type={`character/${type}`} skinColor={selectedSkinColorCode} />;
    }
    return <Image src={images.leftCharacter} alt="Linke Figur" width={200} height={250} />;
  };

  const renderAction = () => {
    const action = dialogData.story[currentSceneIndex].action;
    if (action) {
      return (
          <div className="absolute left-1/2 top-1/2 -ml-28 -mt-32">
            <h1 className="hover:cursor-pointer" onClick={() => router.push(action.route)}>
              {action.text}
            </h1>
          </div>
      );
    }
    return null;
  };

  const renderDialog = () => {
    if (!dialogData.story[currentSceneIndex].action) {
      return (
          <div className="h-full flex justify-center p-10 relative z-0">
            <div className="w-3/5 flex flex-col items-center mb-5">
              {dialog[currentDialogIndex].speaker === 'left' && <SpeechBubble text={dialog[currentDialogIndex].text} direction="left" />}
              {!hideSpeechBubble && dialog[currentDialogIndex].speaker === 'right' && (
                  <SpeechBubble
                      text={feedback.find((fb) => fb.index === currentDialogIndex && !fb.isCorrect)?.hint || dialog[currentDialogIndex].text}
                      direction="right"
                  />
              )}
              {dialog[currentDialogIndex].image && (
                  <div className="flex justify-center mb-4 w-full">
                    <Image src={dialog[currentDialogIndex].image as string} alt="Dialog Bild" width={300} height={100} />
                  </div>
              )}
              <div className="w-full flex flex-col items-center mt-auto">
                {dialog[currentDialogIndex].question?.map((q, index) => (
                    <AnswerButton key={index} q={q} index={index} feedback={feedback} attempts={attempts} onClick={handleAnswerClick} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 text-right pb-6 pr-6 z-10">
              {actionButton && !dialog[currentDialogIndex].question && showActionButton && React.cloneElement(actionButton as React.ReactElement<any>, { onClick: handleNext })}
            </div>
          </div>
      );
    }
    return null;
  };

  return (
      <div className="bg-cover bg-center relative page-container" style={{ backgroundImage: `url(${images.backgroundImg})` }}>
        <div className="absolute bottom-0 left-0 mb-9 ml-5" style={{ width: '200px' }}>
          {renderLeftImage()}
        </div>
        <div className="absolute bottom-0 right-0 mb-9 mr-20">
          <Image src={images.rightCharacter} alt="Rechte Figur" width={200} height={250} />
        </div>
        {renderAction()}
        {renderDialog()}
      </div>
  );
};

interface AnswerButtonProps {
  q: Question;
  index: number;
  feedback: { index: number; isCorrect: boolean; hint?: string }[];
  attempts: number[];
  onClick: (index: number, isCorrect: boolean, hint?: string) => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ q, index, feedback, attempts, onClick }) => {
  const isCorrect = feedback.some((fb) => fb.index === index && fb.isCorrect);
  const isIncorrect = feedback.some((fb) => fb.index === index && !fb.isCorrect);
  const hasAttempt = attempts.includes(index);

  return (
      <div className="w-full max-w-md px-4 py-2">
        <button
            className={`w-full h-24 rounded-lg transition-colors duration-300
          ${isCorrect ? 'bg-green-700 text-white' : isIncorrect ? 'bg-red-700 text-white' : hasAttempt ? 'bg-red-800 text-white' : 'bg-purple-700 text-white'}
          text-center`}
            onClick={() => onClick(index, q.isCorrect, q.hint)}
            disabled={hasAttempt}
        >
          {feedback.some((fb) => fb.index === index) && (
              <span className={`mr-2 ${isCorrect ? 'text-white' : 'text-white'}`}>{isCorrect ? '✓' : '✗'}</span>
          )}
          {q.answer}
        </button>
      </div>
  );
};

export default DialogLayout;

