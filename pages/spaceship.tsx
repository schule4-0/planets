import React, { useState, useEffect } from 'react';
import Layout from '../app/layout';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import SelectItems from '@/app/components/selectItems/selectItems';
import '../app/globals.css';
import Image from 'next/image';
import {
    getRocketColor,
    setRocketColor,
    setRocketType,
    getRocketType
} from '@/app/utils/storageUtils';
import { getRocketColors } from '@/app/utils/colorUtils';

const Spaceship: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');

    useEffect(() => {
        const loadStoredValues = async () => {
            const selectedRocketType = await getRocketType();
            if (selectedRocketType) setSelectedRocketType(selectedRocketType);

            const storedRocketColors = await getRocketColor();
            if (storedRocketColors) setSelectedRocketColor(storedRocketColors);
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    const handleImageClick = async (type: string) => {
        setSelectedRocketType(type);
        if (isClient) await setRocketType(type);
    };

    const handleColorClick = async (index: number) => {
        const colorWord = getRocketColors()[index].word;
        setSelectedRocketColor(colorWord);
        if (isClient) await setRocketColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="flex justify-center items-center h-full">
            <Image
                src={`/images/rocket/${selectedRocketType}_${selectedColor}.png`}
                alt="Rakete"
                width={250}
                height={250}
            />
        </div>
    );

    const renderRightChildren = () => (
        <Layout>
            <div>
                <h2 className="font-bold mb-4 text-center">Baue deine Rakete</h2>
                <h2 className="font-bold mb-4">Flügelform</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={(index) => handleImageClick(index === 0 ? 'rocket1' : 'rocket2')}
                        images={[
                            { src: `/images/rocket/wing1_${selectedColor}.png`, desc: 'Flügel 1' },
                            { src: `/images/rocket/wing2_${selectedColor}.png`, desc: 'Flügel 2' },
                        ]}
                    />
                </div>
                <h2 className="font-bold mb-4">Farbe</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={handleColorClick}
                        colorCodes={getRocketColors().map((color) => color.code)}
                    />
                </div>
            </div>
        </Layout>
    );

    // TODO: Implement routing logic
    const characterPage = () => {
        // Implement navigation logic here
    };

    return (
        <div>
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
                actionButton={<ActionButton onClick={characterPage} />}
            />
        </div>
    );
};

export default Spaceship;
