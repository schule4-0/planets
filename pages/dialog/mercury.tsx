import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/mercury.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Mercury = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame/meteor-mercury');
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
