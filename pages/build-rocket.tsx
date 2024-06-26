import React, { useState, useEffect } from 'react';
import Layout from '../app/layout';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import SelectItems from '@/app/components/selectItems/selectItems';
import SVGColorChanger from "@/app/components/svg/SVGColorChanger";
import '../app/globals.css';
import {
    getRocketColor,
    setRocketColor,
    setRocketType,
    getRocketType
} from '@/app/utils/storageUtils';
import {getRocketColorIndex, getRocketColors} from '@/app/utils/colorUtils';
import {useRouter} from "next/router";

const BuildRocket: React.FC = () => {

    const isClient = typeof window !== 'undefined';
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');
    const [selectRocketTypeIndex, setSelectRocketTypeIndex] = useState<number>(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const rocketTypes: string[] = ["rocket1", "rocket2"];
    const router = useRouter();

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
        const colorWord = getRocketColors()[index].code;
        setSelectedRocketColor(colorWord);
        setSelectedColorIndex(index)
        if (isClient) await setRocketColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="h-full w-full flex justify-center items-center">
            <SVGColorChanger color={selectedColor} type={`rocket/${selectedRocketType}`} />
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
                        components={[
                            <SVGColorChanger
                                key="wing1"
                                color={selectedColor}
                                type="rocket/wing1"
                            />,
                            <SVGColorChanger
                                key="wing2"
                                color={selectedColor}
                                type="rocket/wing2"
                            />
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

    const nextPage = () => {
        router.push('/dialog/earth2');
    };

    return (
        <div className="bg-star">
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
            />
            <ActionButton onClick={nextPage}/>
        </div>
    );
};

export default BuildRocket;
