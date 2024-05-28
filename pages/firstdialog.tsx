import { useState, useEffect } from 'react';
import DialogLayout from '../app/dialoglayout';
import ActionButton from '@/app/components/actionButton/ActionButton';

interface Scene {
  id: string;
  leftDialog: string;
  leftCharacterSrc: string;
  rightCharacterSrc: string;
  rightDialog: string;
  backgroundimg: string;
  button: {
    next: string;
  };
}

const Home = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const fetchScenes = async () => {
      const response = await fetch('/data/dialog.json');
      const data = await response.json();
      setScenes(data.story);
    };
    fetchScenes();
  }, []);

  const handleNext = () => {
    const nextSceneIndex = scenes.findIndex(scene => scene.id === scenes[currentScene].button.next);
    if (nextSceneIndex !== -1) {
      setCurrentScene(nextSceneIndex);
    }
  };

  if (scenes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <DialogLayout
      leftCharacterSrc={scenes[currentScene].leftCharacterSrc}
      rightCharacterSrc={scenes[currentScene].rightCharacterSrc}
      leftDialog={scenes[currentScene].leftDialog}
      rightDialog={scenes[currentScene].rightDialog}
      backgroundImage={scenes[currentScene].backgroundimg}
      actionButton={<ActionButton onClick={handleNext} />}
    />
  );
};

export default Home;
