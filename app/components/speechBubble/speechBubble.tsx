import React from 'react';

interface SpeechBubbleProps {
  text: string;
  direction: 'left' | 'right';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, direction }) => {
  const bubbleImage = direction === 'left' ? '/images/speechBoobleLeft.svg' : '/images/speechBoobleRight.svg';

  return (
    <div className="relative w-full h-full p-6 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${bubbleImage})`, backgroundSize: '100% auto' }}>
  <div className="flex h-full items-center justify-center">
    <p className="text-center text-black m-auto p-4 max-w-full break-words" style={{ maxWidth: '60%' }}> 
      {text}
    </p>
  </div>
</div>


  );
};

export default SpeechBubble;
