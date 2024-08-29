import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/endquiz.json';

const Endquiz = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame/click-spaceship');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Endquiz;
