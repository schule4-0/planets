import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/venus2.json';

const Venus2 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/animation-rocket?landing=false&planet=venus');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Venus2;
