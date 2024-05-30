import React, { useState } from 'react';
import Image from 'next/image';
import SpeechBubble from './components/speechBubble/speechBubble';

interface DialogItem {
  speaker: string;
  text: string;
  image?: string; // optionales Bild
  question?: {
    answer: string;
    isCorrect: boolean;
  }[];
}

interface DialogLayoutProps {
  backgroundimg: string;
  leftCharacter: React.ReactNode;
  rightCharacter: string;
  dialog: DialogItem;
  actionButton: React.ReactNode;
  onAnswerSelect?: (isCorrect: boolean) => void;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({
  backgroundimg,
  leftCharacter,
  rightCharacter,
  dialog,
  actionButton,
  onAnswerSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ index: number; isCorrect: boolean } | null>(null);

  const handleAnswerClick = (index: number, isCorrect: boolean) => {
    setSelectedAnswer(index);
    setFeedback({ index, isCorrect });
    if (isCorrect && onAnswerSelect) {
      onAnswerSelect(isCorrect);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundimg})` }}>
      <div className="absolute bottom-0 left-0 mb-9 ml-5" style={{ marginBottom: '35px' }}>
        {leftCharacter}
      </div>
      <div className="absolute bottom-0 right-0 mb-9 mr-20" style={{ marginBottom: '35px' }}>
        <Image src={rightCharacter} alt="Rechte Figur" width={250} height={250} />
      </div>
      <div className="flex justify-center items-center p-20 relative z-0 h-full">
        <div className="w-3/5 flex flex-col items-center mb-10">
          {dialog.speaker === 'left' && <SpeechBubble text={dialog.text} direction="left" />}
          {dialog.speaker === 'right' && <SpeechBubble text={dialog.text} direction="right" />}
          {dialog.image && (
            <div className="flex justify-center mb-4 w-full">
              <div className="mx-auto">
                <Image src={dialog.image} alt="Dialog Bild" width={150} height={100} />
              </div>
            </div>
          )}
          {dialog.question && (
            <div className="flex flex-col items-center mt-4 w-full">
              {dialog.question.map((q, index) => (
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
        {actionButton}
      </div>
    </div>
  );
};

export default DialogLayout;
