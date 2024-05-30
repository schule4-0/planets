import React from 'react';
import './speechBubble.css';

interface SpeechBubbleProps {
  text: string;
  direction: 'left' | 'right';
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text, direction }) => {
  const bubbleStyles = {
    alignSelf: direction === 'left' ? 'flex-start' : 'flex-end',
    backgroundColor: direction === 'left' ? '#fff' : '#F3F3F3',
    color: direction === 'left' ? '#000' : '#333',
  };

  return (
    <div className={`speech-bubble ${direction}`} style={bubbleStyles}>
      <p>{text}</p>
    </div>
  );
};

export default SpeechBubble;
