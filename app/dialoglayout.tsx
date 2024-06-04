import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import CharacterImage from "@/app/components/character/CharacterImage";
import { getHair, getHairColor, getSkinColor } from '@/app/utils/storageUtils';

interface DialogItem {
  speaker: string;
  text: string;
  image?: string; 
  question?: {
    answer: string;
    isCorrect: boolean;
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
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogItem[]>(dialogData.story[0].dialog);
  const [images, setImages] = useState(dialogData.story[0].images[0]);
  const [selectedHair, setSelectedHair] = useState<string>('short-curly');
  const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
  const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean } | null>(null);

  useEffect(() => {
    const loadStoredValues = async () => {
      const storedHair = await getHair() || 'short-curly';
      const storedHairColorCode = await getHairColor() || '#000000';
      const storedSkinColorCode = await getSkinColor() || '#FCD8B1';

      setSelectedHair(storedHair);
      setSelectedHairColorCode(storedHairColorCode);
      setSelectedSkinColorCode(storedSkinColorCode);
    };

    loadStoredValues();
  }, []);

  useEffect(() => {
    setDialog(dialogData.story[currentSceneIndex].dialog);
    setImages(dialogData.story[currentSceneIndex].images[0]);
  }, [currentSceneIndex]);

  const handleNext = () => {
    const currentDialogLength = dialogData.story[currentSceneIndex].dialog.length;
    if (currentDialogIndex < currentDialogLength - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      const nextSceneIndex = currentSceneIndex + 1;
      if (nextSceneIndex < dialogData.story.length) {
        setCurrentSceneIndex(nextSceneIndex);
        setCurrentDialogIndex(0);
      } else {
        onEnd(); 
      }
    }
  };

  const handleAnswerClick = (index: number, isCorrect: boolean) => {
    setSelectedAnswer(index);
    setFeedback({ index, isCorrect });
    if (isCorrect) {
      setTimeout(() => {
        handleNext();
      }, 1000); // 1 second delay
    }
  };

  return (
    <div className="bg-cover bg-center relative page-container" style={{ backgroundImage: `url(${images.backgroundimg})` }}>
      <div className="absolute bottom-0 left-0 mb-9 ml-5" style={{ width: '250px' }}>
        <CharacterImage
          hairColor={selectedHairColorCode}
          hairType={selectedHair}
          skinColor={selectedSkinColorCode}
        />
      </div>
      <div className="absolute bottom-0 right-0 mb-9 mr-20">
        <Image src={images.rightCharacter} alt="Rechte Figur" width={250} height={250} />
      </div>
      <div className="flex justify-center p-20 relative z-0 h-full">
        <div className="w-3/5 flex flex-col items-center mb-10">
          {dialog[currentDialogIndex].speaker === 'left' && <SpeechBubble text={dialog[currentDialogIndex].text} direction="left" />}
          {dialog[currentDialogIndex].speaker === 'right' && <SpeechBubble text={dialog[currentDialogIndex].text} direction="right" />}
          {dialog[currentDialogIndex].image && (
            <div className="flex justify-center mb-4 w-full">
              <Image src={dialog[currentDialogIndex].image as string} alt="Dialog Bild" width={150} height={100} />
            </div>
          )}
          {dialog[currentDialogIndex].question && (
            <div className="flex flex-col items-center mt-4 w-full">
              {dialog[currentDialogIndex]?.question?.map((q, index) => (
                <button
                  key={index}
                  className={`w-full max-w-md px-4 py-2 h-24 m-2 rounded-lg transition-colors duration-300
                    ${feedback && feedback.index === index 
                      ? (feedback.isCorrect 
                          ? 'bg-[#186B21] text-white' 
                          : 'bg-[#8D2020] text-white') 
                      : 'bg-[#9747FF] text-white hover:bg-white hover:text-[#9747FF]'}
                    text-center`}
                  onClick={() => handleAnswerClick(index, q.isCorrect)}
                >
                  {q.answer}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-right pb-6 pr-6 z-10">
        {actionButton ? React.cloneElement(actionButton as React.ReactElement<any>, { onClick: handleNext }) : null}
      </div>
    </div>
  );
};

export default DialogLayout;
