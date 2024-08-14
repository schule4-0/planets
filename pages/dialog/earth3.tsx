import React from 'react';
import {useRouter} from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/earth3.json';

const Earth3 = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push('/dialog/rocket-see-map');
  };

  return (
    <DialogLayout
      dialogData={dialogData}
      onEnd={handleRouting}
    />
  );
};

export default Earth3;
