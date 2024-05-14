import React, { useState, useEffect, useRef } from 'react';
import Layout from '../app/layout';
import SelectLayout from "@/app/selectLayout";
import ActionButton from "@/app/components/actionButton/ActionButton";
import SelectItems from "@/app/components/selectItems/selectItems";
import "./character.css";
import "../app/globals.css";
import Image from "next/image";
import { getStoredValue, setStoredValue, removeStoredValue } from '@/app/utils/storageUtils';
import { getColorWord, getColors } from '@/app/utils/colorUtils';

const Character: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [selectedImageType, setSelectedImageType] = useState<string>('girl');
    const [selectedColorWord, setSelectedColorWord] = useState<string>('dark');
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedName = getStoredValue('characterName');
        if (storedName) {
            setName(storedName);
        }

        const storedImageType = getStoredValue('selectedImageType');
        if (storedImageType) {
            setSelectedImageType(storedImageType);
        }

        const storedColorWord = getStoredValue('selectedColorWord');
        if (storedColorWord) {
            setSelectedColorWord(storedColorWord);
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setStoredValue('characterName', newName);
    };

    const handleImageClick = (type: string) => {
        setSelectedImageType(type);
        setStoredValue('selectedImageType', type);
    };

    const handleColorClick = (index: number) => {
        const colorWord = getColors()[index].word;
        setSelectedColorWord(colorWord);
        setStoredValue('selectedColorWord', colorWord);
    };

    const clearLocalStorage = () => {
        removeStoredValue('selectedImageType');
        removeStoredValue('selectedColorWord');
        setSelectedImageType('girl');
        setSelectedColorWord('dark');
    };

    const renderLeftChildren = () => {
        const imageType = getStoredValue('selectedImageType') || selectedImageType;
        const colorWord = getStoredValue('selectedColorWord') || selectedColorWord;
        return (
            <div className="h-full w-auto flex justify-center items-center">
                <Image className="character-image" src={`/images/${imageType}_${colorWord}.svg`}
                       alt="Ausgewählter Charakter" width={400} height={627} />
            </div>
        );
    };

    const renderRightChildren = () => {
        const colorWord = getStoredValue('selectedColorWord') || selectedColorWord;
        return (
            <Layout>
                <div>
                    <h1 className="font-bold mb-4 text-center">Entwerfe deinen Charakter</h1>
                    <h2 className="font-bold mb-4">Geschlecht</h2>
                    <div className="text-center">
                        <SelectItems onClick={index => handleImageClick(index === 0 ? 'girl' : 'boy')} images={[
                            { src: `/images/girl_${colorWord}.svg`, desc: "Weiblich" },
                            { src: `/images/boy_${colorWord}.svg`, desc: "Männlich" },
                        ]} />
                    </div>
                    <h2 className="font-bold mb-4">Haarfarbe</h2>
                    <div className="text-center">
                        <SelectItems onClick={handleColorClick} colorCodes={getColors().map(color => color.code)} />
                    </div>
                    <div>
                        <div>
                            <div className="flex items-center mb-4">
                                <label className="h2 font-bold">Name </label>
                                <input
                                    ref={nameInputRef}
                                    id="nameInput"
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Trage deinen Namen ein"
                                    className="h2 w-full text-3xl text-black rounded-2xl border-2 border-black ml-2 p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    };

    let rocketpage;
    return (
        <div>
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
                actionButton={<ActionButton onClick={rocketpage}/>}
            />
        </div>
    );
};

export default Character;
