import React from 'react';
import DialogLayout from '../app/dialoglayout';
import dialogData from '../public/dialog/dialog2.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const Dialog = () => {
  return (
    <DialogLayout
      dialogData={dialogData}
      actionButton={<ActionButton onClick={() => { } } />}
        />
  );
};

export default Dialog;
