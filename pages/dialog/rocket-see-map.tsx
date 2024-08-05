import React from 'react';
import { useRouter } from 'next/router';
import DialogLayout from '../../app/dialoglayout';
import dialogData from '@/public/json/dialog/rocketSeeMap.json';
import ActionButton from '@/app/components/actionButton/ActionButton';

const RocketSeeMap = () => {
    const router = useRouter();

    const handleRouting = () => {
        router.push('/map/interactive');
    };

    return (
        <DialogLayout
            dialogData={dialogData}
            actionButton={<ActionButton onClick={() => { } } />}
            onEnd={handleRouting}
        />
    );
};

export default RocketSeeMap;
