import React, {useEffect, useRef, useState} from 'react';
import Layout from '../app/layout';
import SelectLayout from "@/app/selectLayout";
import ActionButton from "@/app/components/actionButton/ActionButton";
import SelectItems from "@/app/components/selectItems/selectItems";
import "./character.css";
import "../app/globals.css";
import Image from "next/image";
import {getStoredValue, setStoredValue} from '@/app/utils/storageUtils';
import {getHairColors} from '@/app/utils/colorUtils';

const Character: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [name, setName] = useState<string>('');
    const [selectedImageType, setSelectedImageType] = useState<string>('girl');
    const [selectedColorWord, setSelectedColorWord] = useState<string>('dark');
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isClient) {
            const storedName = getStoredValue('characterName');
            if (storedName) {
                setName(storedName);
            }

            const storedImageType = getStoredValue('selectedImageType');
            if (storedImageType) {
                setSelectedImageType(storedImageType);
            }

            const storedColorWord = getStoredValue('selectedHairColorWord');
            if (storedColorWord) {
                setSelectedColorWord(storedColorWord);
            }
        }
    }, [isClient]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (isClient) {
            setStoredValue('characterName', newName);
        }
    };

    const handleImageClick = (type: string) => {
        setSelectedImageType(type);
        if (isClient) {
            setStoredValue('selectedImageType', type);
        }
    };

    const handleColorClick = (index: number) => {
        const colorWord = getHairColors()[index].word;
        setSelectedColorWord(colorWord);
        if (isClient) {
            setStoredValue('selectedHairColorWord', colorWord);
        }
    };

    const renderLeftChildren = () => {
        return (
            <div className="h-full w-auto flex justify-center items-center">
                <Image className="character-image" src={`/images/${selectedImageType}_${selectedColorWord}.svg`}
                       alt="Ausgewählter Charakter" width={400} height={627} />
            </div>
        );
    };

    const renderRightChildren = () => {
        return (
            <Layout>
                <div>
                    <h1 className="font-bold mb-4 text-center">Entwerfe deinen Charakter</h1>
                    <h2 className="font-bold mb-4">Geschlecht</h2>
                    <div className="text-center">
                        <SelectItems onClick={index => handleImageClick(index === 0 ? 'girl' : 'boy')} images={[
                            { src: `/images/girl_${selectedColorWord}.svg`, desc: "Weiblich" },
                            { src: `/images/boy_${selectedColorWord}.svg`, desc: "Männlich" },
                        ]} />
                    </div>
                    <h2 className="font-bold mb-4">Haarfarbe</h2>
                    <div className="text-center">
                        <SelectItems onClick={handleColorClick} colorCodes={getHairColors().map(color => color.code)} />
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
    //TODO Routing
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
