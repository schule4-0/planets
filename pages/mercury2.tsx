import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/mercury2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Mercury2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('//animation-rocket?landing=false&planet=mercury');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting} 
    />
  );
};

export default Mercury2;
