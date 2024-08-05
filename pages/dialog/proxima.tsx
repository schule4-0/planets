import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/proxima.json';

const Proxima = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/build-rocket');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Proxima;
