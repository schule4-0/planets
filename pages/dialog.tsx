import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/dialog.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Dialog = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/dialog2'); 
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting} 
    />
  );
};

export default Dialog;
