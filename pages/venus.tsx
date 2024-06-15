import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/venus.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Venus = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/memory-venus'); 
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting} 
    />
  );
};

export default Venus;
