import React from 'react';
import Image from 'next/image';
import SpeechBubble from './components/speechBubble/speechBubble';

interface LayoutProps {
  leftCharacterSrc: string;
  rightCharacterSrc: string;
  leftDialog: string;
  rightDialog: string;
  backgroundImage: string;
  actionButton: React.ReactNode;
}

const DialogLayout: React.FC<LayoutProps> = ({ leftCharacterSrc, rightCharacterSrc, leftDialog, rightDialog, backgroundImage, actionButton }) => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute top-1/4 left-20 flex space-x-4">
        <Image src={leftCharacterSrc} alt="Left Character" width={250} height={250} />
        {leftDialog && <SpeechBubble text={leftDialog} direction="left" />}
      </div>
      <div className="absolute top-1/4 right-40 flex space-x-4">
        {rightDialog && <SpeechBubble text={rightDialog} direction="right" />}
        <Image src={rightCharacterSrc} alt="Right Character" width={250} height={250} />
      </div>
      <div className="absolute bottom-4 right-4">
        {actionButton}
      </div>
    </div>
  );
};

export default DialogLayout;
