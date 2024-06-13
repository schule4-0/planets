import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/mercury.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Mercury = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame-mecury'); 
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting} 
    />
  );
};

export default Mercury;
