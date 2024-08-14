import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/mercury2.json';

const Mercury2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/animation-rocket?landing=false&planet=mercury');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Mercury2;
