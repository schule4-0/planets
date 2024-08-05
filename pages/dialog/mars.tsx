import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/mars.json';

const Mars = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame/textClick-mars');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Mars;
