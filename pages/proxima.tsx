import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/proxima.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Proxima = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/spaceship-see-map');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
      onEnd={handleRouting}
    />
  );
};

export default Proxima;
