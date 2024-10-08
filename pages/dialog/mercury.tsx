import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/mercury.json';

const Mercury = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame/meteor-mercury');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Mercury;
