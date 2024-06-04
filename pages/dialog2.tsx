import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/dialog2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Dialog2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/map'); 
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting}
    />
  );
};

export default Dialog2;
