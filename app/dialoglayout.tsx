import React from 'react';
import Image from 'next/image';
import SpeechBubble from './components/speechBubble/speechBubble';

interface DialogItem {
  speaker: string;
  text: string;
  image?: string; // optionales Bild
}

interface DialogLayoutProps {
  backgroundimg: string;
  leftCharacter: React.ReactNode; 
  rightCharacter: string;
  dialog: DialogItem;
  actionButton: React.ReactNode;
}

const DialogLayout: React.FC<DialogLayoutProps> = ({ backgroundimg, leftCharacter, rightCharacter, dialog, actionButton }) => {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundimg})` }}>
      <div className="flex justify-between p-20 relative z-0 h-full">
        <div className="w-1/5 flex items-end mb-50">
          {leftCharacter}
        </div>
        <div className="w-3/5 flex flex-col items-center mb-10">
          {dialog.speaker === 'left' && <SpeechBubble text={dialog.text} direction="left" />}
          {dialog.speaker === 'right' && <SpeechBubble text={dialog.text} direction="right" />}
          {dialog.image && (
            <div className="flex justify-center mb-1 w-full">
              <div className="mx-auto">
                <Image src={dialog.image} alt="Dialog Bild" width={150} height={100} />
              </div>
            </div>
          )}
        </div>
        <div className="w-1/5 flex items-end mb-50">
          <Image src={rightCharacter} alt="Rechte Figur" width={250} height={250} />
        </div>
      </div>
      <div className="text-right pb-6 pr-6 pt-0 absolute bottom-0 right-0 z-10">
        {actionButton}
      </div>
    </div>
  );
};

export default DialogLayout;
