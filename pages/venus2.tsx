import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/venus2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Venus2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/animation-rocket?landing=false&planet=venus');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting} 
    />
  );
};

export default Venus2;
