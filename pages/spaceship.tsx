import React, { useState, useEffect } from 'react';
import Layout from '../app/layout';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import SelectItems from '@/app/components/selectItems/selectItems';
import '../app/globals.css';
import Image from 'next/image';
import {getRocketWing, getRocketColor, setRocketWing, setRocketColor} from '@/app/utils/storageUtils';
import {getRocketColors} from '@/app/utils/colorUtils';

const Spaceship: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [selectedWingType, setSelectedWingType] = useState<string>('wing1');
    const [selectedColor, setSelectedRocketColor] = useState<any>(`orange`);

    useEffect(() => {
        const loadStoredValues = async () => {
            const storedWingType = await getRocketWing();
            if (storedWingType) setSelectedWingType(storedWingType);

            const storedRocketColors = await getRocketColor();
            if (storedRocketColors) setSelectedRocketColor(storedRocketColors);
        };

        if (isClient) loadStoredValues();
    }, [isClient]);


    const handleImageClick = async (type: string) => {
        setSelectedWingType(type);
        if (isClient) await setRocketWing(type);
    };

    const handleColorClick = async (index: number) => {
        const colorWord = getRocketColors()[index].word;
        setSelectedRocketColor(colorWord);
        if (isClient) await setRocketColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="flex justify-center items-center h-full">
            <Image
                src={`/images/${selectedWingType}_${selectedColor}.svg`}
                alt="Spaceship"
                width={250}
                height={250}
            />
        </div>
    );

    const renderRightChildren = () => (
        <Layout>
            <div>
                <h2 className="font-bold mb-4 text-center">Build Your Spaceship</h2>
                <h2 className="font-bold mb-4">Wing Type</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={(index) => handleImageClick(index === 0 ? 'wing1' : 'wing2')}
                        images={[
                            { src: `/images/wing1.png`, desc: 'Wing 1' },
                            { src: `/images/wing2.png`, desc: 'Wing 2' },
                        ]}
                    />
                </div>
                <h2 className="font-bold mb-4">Color</h2>
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
