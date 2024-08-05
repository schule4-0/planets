import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/venus.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Venus = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/minigame/memory-venus');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Venus;
