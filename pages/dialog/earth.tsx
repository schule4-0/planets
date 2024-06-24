import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/earth.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Earth = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/build-rocket');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting}
    />
  );
};

export default Earth;
