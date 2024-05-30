import React, { useState, useEffect } from 'react';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/data/dialog.json';
import ActionButton from '@/app/components/actionButton/ActionButton';
import CharacterImage from "@/app/components/character/CharacterImage";
import {
  getHair,
  getHairColor,
  getSkinColor
} from '@/app/utils/storageUtils';

const FirstDialog = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [dialog, setDialog] = useState(dialogData.story[0].dialog);
  const [images, setImages] = useState(dialogData.story[0].images[0]);
  const [selectedHair, setSelectedHair] = useState<string>('short-curly');
  const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
  const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');

  const handleNext = () => {
    const currentDialogLength = dialogData.story[currentSceneIndex].dialog.length;

    if (currentDialogIndex < currentDialogLength - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      const nextSceneIndex = currentSceneIndex + 1;

      if (nextSceneIndex < dialogData.story.length) {
        setCurrentSceneIndex(nextSceneIndex);
        setCurrentDialogIndex(0);
        setDialog(dialogData.story[nextSceneIndex].dialog);
        setImages(dialogData.story[nextSceneIndex].images[0]);
      } else {
        console.log('Story is finished');
      }
    }
  };

  const handleAnswerSelect = (isCorrect: boolean) => {
    if (isCorrect) {
      setTimeout(() => {
        handleNext();
      }, 1000); // 1 second delay
    } else {
      console.log('Wrong answer');
    }
  };

  useEffect(() => {
    const loadStoredValues = async () => {
      const storedHair = await getHair();
      if (storedHair) setSelectedHair(storedHair);

      const storedHairColorCode = await getHairColor();
      if (storedHairColorCode) setSelectedHairColorCode(storedHairColorCode);

      const storedSkinColorCode = await getSkinColor();
      if (storedSkinColorCode) setSelectedSkinColorCode(storedSkinColorCode);
    };

    if (typeof window !== 'undefined') {
      const hairColorCode = localStorage.getItem('selectedHairColorCode') || '';
      const hair = localStorage.getItem('selectedHair') || '';
      const skinColorCode = localStorage.getItem('selectedSkinColorCode') || '';

      setSelectedHairColorCode(hairColorCode);
      setSelectedHair(hair);
      setSelectedSkinColorCode(skinColorCode);

      loadStoredValues();
    }
  }, []);

  return (
    <div>
      <DialogLayout
        backgroundimg={images.backgroundimg}
        leftCharacter={
          <CharacterImage
            hairColor={selectedHairColorCode}
            hairType={selectedHair}
            skinColor={selectedSkinColorCode}
          />
        }
        rightCharacter={images.rightCharacter}
        dialog={dialog[currentDialogIndex]}
        actionButton={<ActionButton onClick={handleNext} />}
        onAnswerSelect={handleAnswerSelect}
      />
    </div>
  );
};

export default FirstDialog;
