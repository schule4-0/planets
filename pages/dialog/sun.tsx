import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/sun.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Sonne = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/map/interactive');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Sonne;
