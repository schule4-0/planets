import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/earth2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Earth2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/earth3'); 
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting}
    />
  );
};

export default Earth2;
