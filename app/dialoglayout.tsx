import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import CharacterImage from "@/app/components/svg/SVGColorChanger";
import {
  getHair,
  getHairColor,
  getSkinColor
} from '@/app/utils/storageUtils';
import { wait } from "next/dist/lib/wait";

interface DialogItem {
  speaker: string;
  text: string;
  image?: string;
  question?: {
    answer: string;
    isCorrect: boolean;
    hint?: string;
    route?: string;
  }[];
}

interface DialogLayoutProps {
  dialogData: any;
  actionButton?: React.ReactNode;
  onEnd: () => void;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({
  dialogData,
  actionButton,
  onEnd,
}) => {
  const router = useRouter();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogItem[]>(dialogData?.story[0]?.dialog || []);
  const [images, setImages] = useState(dialogData?.story[0]?.images[0] || {});
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean; hint?: string }[]>([]);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [hideSpeechBubble, setHideSpeechBubble] = useState<boolean>(false);
  const [showActionButton, setShowActionButton] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string | undefined>(undefined);
  const isClient = typeof window !== 'undefined';
  const [selectedHair, setSelectedHair] = useState<string>('short-curly');
  const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
  const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    const loadStoredValues = async () => {
      if (isClient) {
        await wait(200);
        const storedHair = await getHair();
        if (storedHair) {
          setSelectedHair(storedHair);
        }

        const storedHairColorCode = await getHairColor();
        if (storedHairColorCode) {
          setSelectedHairColorCode(storedHairColorCode);
        }

        const storedSkinColorCode = await getSkinColor();
        if (storedSkinColorCode) {
          setSelectedSkinColorCode(storedSkinColorCode);
        }
      }
    };
    loadStoredValues();
  }, [isClient]);

  useEffect(() => {
    setDialog(dialogData?.story[currentSceneIndex]?.dialog || []);
    setImages(dialogData?.story[currentSceneIndex]?.images[0] || {});
    setFeedback([]);
    setAttempts([]);
    setHideSpeechBubble(false);
    setShowActionButton(false);
    setCurrentHint(undefined);
  }, [currentSceneIndex, dialogData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActionButton(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentDialogIndex]);

  const handleNext = () => {
    const currentDialogLength = dialogData?.story[currentSceneIndex]?.dialog?.length || 0;
    if (currentDialogIndex < currentDialogLength - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
      setFeedback([]);
      setAttempts([]);
      setHideSpeechBubble(false);
      setShowActionButton(false);
      setCurrentHint(undefined);
    } else {
      const nextSceneIndex = currentSceneIndex + 1;
      if (nextSceneIndex < dialogData?.story?.length) {
        setCurrentSceneIndex(nextSceneIndex);
        setCurrentDialogIndex(0);
      } else {
        onEnd();
      }
    }
  };

  const handleAnswerClick = (index: number, isCorrect: boolean, hint?: string) => {
    if (!answeredQuestions.has(currentDialogIndex)) {
      setAnsweredQuestions(prev => new Set(prev.add(currentDialogIndex)));
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      } else {
        setIncorrectCount(prev => prev + 1);
      }
    }
    setFeedback(prev => [...prev, { index, isCorrect, hint }]);
    const currentDialog = dialog[currentDialogIndex];
    const questionCount = currentDialog?.question?.length || 0;

    const proceedToNext = () => {
      if (questionCount <= 2) {
        setTimeout(handleNext, 1000);
      }
    };

    if (!isCorrect) {
      setAttempts(prev => [...prev, index]);
      setCurrentHint(hint); 
      proceedToNext(); 
    }
    if (isCorrect) {
      setHideSpeechBubble(true);
      setTimeout(() => {
        if (currentDialogIndex < dialog.length) {
          const currentDialog = dialog[currentDialogIndex];
          if (currentDialog?.question && index < currentDialog.question.length) {
            const question = currentDialog.question[index];
            if (question?.route) {
              router.push(question.route);
              return;
            }
          }
        }
        handleNext();
      }, 1000);
    }
  };

  const leftImage = () => {
    if (images.leftCharacter === "player") {
      return (
        <CharacterImage
          color={selectedHairColorCode}
          type={"character/" + selectedHair}
          skinColor={selectedSkinColorCode}
        />
      )
    }
    if (images.leftCharacter === "astro-player") {
      return (
        <CharacterImage
          color={selectedHairColorCode}
          type={"character/astro-" + selectedHair}
          skinColor={selectedSkinColorCode}
        />
      )
    }
    return (
      <Image src={images.leftCharacter} alt="Linke Figur" width={200} height={250} />
    )
  }

  function renderAction() {
    if (dialogData?.story[0]?.action !== undefined) {
      return <>
        <div className={"absolute left-1/2 top-1/2 -ml-28 -mt-32"}>
          <h1 className={"hover:cursor-pointer"} onClick={() => router.push(dialogData.story[0].action.route)}>{dialogData.story[0].action.text}</h1>
        </div>
      </>
    }
    return null;
  }

  function renderDialog() {
    const isFinalDialog = currentSceneIndex === (dialogData?.story?.length || 0) - 1 && currentDialogIndex === (dialog?.length || 0) - 1;
    const isEndQuizPath = router.pathname === '/dialog/endquiz';

    return <div className={"h-full"}>
      <div className="flex justify-center p-10 relative z-0 h-full">
        <div className="w-3/5 flex flex-col items-center mb-5">
          {dialog[currentDialogIndex]?.speaker === 'left' && (
            <SpeechBubble text={dialog[currentDialogIndex].text} direction="left" />
          )}
          {!hideSpeechBubble && dialog[currentDialogIndex]?.speaker === 'right' && (
            <SpeechBubble text={
              isFinalDialog && isEndQuizPath
                ? `Super, du hast ${correctCount} Fragen richtig und ${incorrectCount} Fragen falsch beantwortet!`
                : currentHint || dialog[currentDialogIndex].text
            } direction="right" />
          )}
          {dialog[currentDialogIndex]?.image && (
            <div className="flex justify-center mb-4 w-full">
              <Image src={dialog[currentDialogIndex].image as string} alt="Dialog Bild" width={300} height={100} />
            </div>
          )}
          <div className="w-full flex flex-col items-center mt-auto">
            {dialog[currentDialogIndex]?.question?.map((q, index) => (
              <div key={index} className="w-full max-w-md px-4 py-2">
                <button
                  className={`w-full h-24 rounded-lg transition-colors duration-300
                  ${feedback.some(fb => fb.index === index && fb.isCorrect)
                      ? 'bg-[#186B21] text-white'
                      : feedback.some(fb => fb.index === index && !fb.isCorrect)
                        ? 'bg-[#DD0000] text-white'
                        : attempts.includes(index)
                          ? 'bg-[#B12828] text-white'
                          : 'bg-[#9747FF] text-white'}
                  text-center`}
                  onClick={() => handleAnswerClick(index, q.isCorrect, q.hint)}
                  disabled={attempts.includes(index)}
                >
                  {feedback.some(fb => fb.index === index) && (
                    <span className={`mr-2 ${feedback.find(fb => fb.index === index)?.isCorrect ? 'text-white' : 'text-white'}`}>
                      {feedback.find(fb => fb.index === index)?.isCorrect ? '✓' : '✗'}
                    </span>
                  )}
                  {q.answer}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-right pb-6 pr-6 z-10">
        {actionButton && !dialog[currentDialogIndex]?.question && showActionButton && React.cloneElement(actionButton as React.ReactElement<any>, { onClick: handleNext })}
      </div>
    </div>
  }

  return (
    <div className="bg-cover bg-center relative page-container"
      style={{ backgroundImage: `url(${images.backgroundImg})` }}>
      <div className="absolute bottom-0 left-0 mb-9 ml-5" style={{ width: '200px' }}>
        {leftImage()}
      </div>
      <div className="absolute bottom-0 right-0 mb-9 mr-20">
        <Image src={images.rightCharacter} alt="Rechte Figur" width={200} height={250} />
      </div>
      {renderDialog()}
      {renderAction()}
    </div>
  );
};

export default DialogLayout;
