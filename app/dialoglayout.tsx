import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import CharacterImage from "@/app/components/svg/SVGColorChanger";
import {
  getHair,
  getHairColor,
  getSkinColor
} from '@/app/utils/storageUtils';

interface DialogItem {
  speaker: string;
  text: string;
  image?: string;
  question?: {
    answer: string;
    isCorrect: boolean;
    hint?: string;
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
  const [images, setImages] = useState(dialogData.story[currentSceneIndex].images[0]);
  const [selectedHair, setSelectedHair] = useState<string>('short-curly');
  const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
  const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean; hint?: string } | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [hideSpeechBubble, setHideSpeechBubble] = useState<boolean>(false);

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
    setFeedback(null);
    setAttempts([]);
    setHideSpeechBubble(false);
  }, [currentSceneIndex, dialogData.story]);

  const handleNext = () => {
    const currentDialogLength = dialogData.story[currentSceneIndex].dialog.length;
    if (currentDialogIndex < currentDialogLength - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
      setFeedback(null);
      setAttempts([]);
      setHideSpeechBubble(false);
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

  const handleAnswerClick = (index: number, isCorrect: boolean, hint?: string) => {
    setFeedback({ index, isCorrect, hint });
    if (!isCorrect) {
      setAttempts(prev => [...prev, index]);
    } else {
      setHideSpeechBubble(true);
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  const leftImage = () =>{
    if (images.leftCharacter === "player"){
      if(!selectedHair.includes("kids/")){
        setSelectedHair("kids/" + selectedHair)
      }
      return(
          <CharacterImage
              color={selectedHairColorCode}
              type={selectedHair}
              skinColor={selectedSkinColorCode}
          />
      )
    }
    return (
        <Image src={images.leftCharacter} alt="Linke Figur" width={200} height={250} />
    )
  }

  return (
    <div className="bg-cover bg-center relative page-container" style={{ backgroundImage: `url(${images.backgroundimg})` }}>
      <div className="absolute bottom-0 left-0 mb-9 ml-5" style={{ width: '200px' }}>
        {leftImage()}
      </div>
      <div className="absolute bottom-0 right-0 mb-9 mr-20">
        <Image src={images.rightCharacter} alt="Rechte Figur" width={200} height={250} />
      </div>
      <div className="flex justify-center p-10 relative z-0 h-full">
        <div className="w-3/5 flex flex-col items-center mb-5">
          {dialog[currentDialogIndex].speaker === 'left' && (
            <SpeechBubble text={dialog[currentDialogIndex].text} direction="left" />
          )}
          {!hideSpeechBubble && dialog[currentDialogIndex].speaker === 'right' && (
            <SpeechBubble text={feedback && !feedback.isCorrect && feedback.hint ? feedback.hint : dialog[currentDialogIndex].text} direction="right" />
          )}
          {dialog[currentDialogIndex].image && (
            <div className="flex justify-center mb-4 w-full">
              <Image src={dialog[currentDialogIndex].image as string} alt="Dialog Bild" width={300} height={100} />
            </div>
          )}
          <div className="w-full flex flex-col items-center mt-auto">
            {dialog[currentDialogIndex].question?.map((q, index) => (
              <div key={index} className="w-full max-w-md px-4 py-2">
                <button
                  className={`w-full h-24 rounded-lg transition-colors duration-300
                    ${feedback && feedback.index === index 
                      ? (feedback.isCorrect 
                          ? 'bg-[#186B21] text-white' 
                          : 'bg-[#8D2020] text-white') 
                      : attempts.includes(index) 
                      ? 'bg-[#8D2020] text-white opacity-50' 
                      : 'bg-[#9747FF] text-white hover:bg-white hover:text-[#9747FF]'}
                    text-center`}
                  onClick={() => handleAnswerClick(index, q.isCorrect, q.hint)}
                  disabled={attempts.includes(index)}
                >
                  {q.answer}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-right pb-6 pr-6 z-10">
        {actionButton && !dialog[currentDialogIndex].question && React.cloneElement(actionButton as React.ReactElement<any>, { onClick: handleNext })}
      </div>
    </div>
  );
};

export default DialogLayout;
