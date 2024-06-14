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
import {getRocketColorIndex, getRocketColors} from '@/app/utils/colorUtils';

const Spaceship: React.FC = () => {

    const isClient = typeof window !== 'undefined';
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');
    const [selectRocketTypeIndex, setSelectRocketTypeIndex] = useState<number>(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const rocketTypes: string[] = ["rocket1", "rocket2"];

    useEffect(() => {
        const loadStoredValues = async () => {
            const selectedRocketType = await getRocketType();
            if (selectedRocketType){
                setSelectedRocketType(selectedRocketType);
                setSelectRocketTypeIndex(getRocketIndex(selectedRocketType));
            }

            const storedRocketColors = await getRocketColor();
            if (storedRocketColors){
                setSelectedRocketColor(storedRocketColors);
                setSelectedColorIndex(getRocketColorIndex(storedRocketColors));
            }
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    const getRocketIndex = (rocketType: string): number => {
        return rocketTypes.indexOf(rocketType);
    };

    const handleImageClick = async (type: string) => {
        setSelectedRocketType(type);
        setSelectRocketTypeIndex(getRocketIndex(type));
        if (isClient) await setRocketType(type);
    };

    const handleColorClick = async (index: number) => {
        const colorWord = getRocketColors()[index].word;
        setSelectedRocketColor(colorWord);
        setSelectedColorIndex(index)
        if (isClient) await setRocketColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="h-full w-full flex justify-center items-center">
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
                <h1 className="mb-4 text-center">Baue deine Rakete</h1>
                <h2 className="mb-4">Flügelform</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={(index) => handleImageClick(index === 0 ? 'rocket1' : 'rocket2')}
                        images={[
                            { src: `/images/rocket/wing1_${selectedColor}.png`, desc: 'Flügel 1' },
                            { src: `/images/rocket/wing2_${selectedColor}.png`, desc: 'Flügel 2' },
                        ]}
                        selectedIndex={selectRocketTypeIndex}
                    />
                </div>
                <h2 className="mb-4">Farbe</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={handleColorClick}
                        colorCodes={getRocketColors().map((color) => color.code)}
                        selectedIndex={selectedColorIndex}
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
        <div className="bg-star">
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
            />
            <ActionButton onClick={characterPage()}/>
        </div>
    );
};

export default Spaceship;
