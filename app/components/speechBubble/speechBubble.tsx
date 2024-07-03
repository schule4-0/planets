import React from 'react';
import './speechBubble.css';

interface SpeechBubbleProps {
  text: string;
  direction: 'left' | 'right';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, direction }) => {
  return (
    <div className={`speech-bubble text-black ${direction}`}>
      <p>{text}</p>
    </div>
  );
};

export default SpeechBubble;
