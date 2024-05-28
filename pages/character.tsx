import React, { useEffect, useRef, useState } from 'react';
import Layout from '../app/layout';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import SelectItems from '@/app/components/selectItems/selectItems';
import CharacterImage from "@/app/components/character/CharacterImage";
import './character.css';
import '../app/globals.css';
import {
    getHair,
    getHairColor,
    getCharacterName,
    setHair,
    setHairColor,
    setCharacterName,
    setSkinColor, getSkinColor
} from '@/app/utils/storageUtils';
import { getHairColors,getSkinColors } from '@/app/utils/colorUtils';

const Character: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [name, setName] = useState<string>('');
    const [selectedHair, setSelectedHair] = useState<string>('short-curly')
    const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
    const [lastSelectedHairColorCode, setLastSelectedHairColorCode] = useState<string>('#000000');
    const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');

    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadStoredValues = async () => {
            const storedName = await getCharacterName();
            if (storedName) setName(storedName);

            const storedHair = await getHair();
            if (storedHair) setSelectedHair(storedHair);

            const storedHairColorCode = await getHairColor();
            if (storedHairColorCode) setSelectedHairColorCode(storedHairColorCode);

            const storedSkinColorCode = await getSkinColor();
            if (storedSkinColorCode) setSelectedSkinColorCode(storedSkinColorCode);
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (isClient) await setCharacterName(newName);
    };

    const handleImageClick = async (type: string) => {
        setSelectedHair(type);
        if (isClient) await setHair(type);
    };

    const handleHairColorClick = async (index: number) => {
        const colorWord = getHairColors()[index].code;
        setLastSelectedHairColorCode(selectedHairColorCode);
        setSelectedHairColorCode(colorWord);
        if (isClient) await setHairColor(colorWord);
    };

    const handleSkinColorClick = async (index: number) => {
        const colorWord = getSkinColors()[index].code;
        setSelectedSkinColorCode(colorWord);
        if (isClient) await setSkinColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="character-image h-full w-full flex justify-center items-center">
            <CharacterImage hairColor={selectedHairColorCode} lastHairColor={lastSelectedHairColorCode} hairType={selectedHair} skinColor ={selectedSkinColorCode}></CharacterImage>
        </div>
    );

    const renderRightChildren = () => (
        <Layout>
            <div>
                <h1 className="mb-4 text-center">Entwerfe deinen Charakter</h1>
                <h2 className="mb-4">Frisur</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={(index) => {
                            const desc = ['short-curly', 'short-straight', 'long-curly', 'long-straight'][index];
                            handleImageClick(desc);
                        }}
                        images={[
                            {src: `/images/kids/short-curly.svg`, desc: 'short-curly'},
                            {src: `/images/kids/short-straight.svg`, desc: 'short-straight'},
                            {src: `/images/kids/long-curly.svg`, desc: 'long-curly'},
                            {src: `/images/kids/long-straight.svg`, desc: 'long-straight'},
                        ]}
                    />
                </div>
                <h2 className="mb-4">Haarfarbe</h2>
                <div className="text-left">
                    <SelectItems
                        onClick={handleHairColorClick}
                        colorCodes={getHairColors().map((color) => color.code)}
                    />
                </div>
                <h2 className="font-bold mb-4">Hautfarbe</h2>
                <div className="text-left">
                    <SelectItems
                        onClick={handleSkinColorClick}
                        colorCodes={getSkinColors().map((color) => color.code)}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="h2">Name</label>
                    <input
                        ref={nameInputRef}
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                        className="h2 w-full text-3xl text-black rounded-2xl border-2 border-black ml-2 p-2"
                    />
                </div>
            </div>
        </Layout>
    );

    // TODO: Implement routing logic
    const rocketPage = () => {
        // Implement navigation logic here
    };

    return (
        <div>
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
                actionButton={<ActionButton onClick={rocketPage}/>}
            />
        </div>
    );
};

export default Character;
