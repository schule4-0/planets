import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/mars2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Mars = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/animation-rocket?landing=false&planet=mars');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting}
    />
  );
};

export default Mars;
