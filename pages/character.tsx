import React, {useEffect, useRef, useState} from 'react';
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
import {
    getHairColorIndex,
    getHairColors, getSkinColorIndex,
    getSkinColors
} from '@/app/utils/colorUtils';

const Character: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [name, setName] = useState<string>('');
    const [selectedHair, setSelectedHair] = useState<string>('short-curly')
    const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
    const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [selectedIndexHairType, setSelectedIndexHairType] = useState<number>(0);
    const [selectedIndexHairColor, setSelectedIndexHairColor] = useState<number>(0);
    const [selectedIndexSkinColor, setSelectedIndexSkinColor] = useState<number>(0);
    const hairTypes: string[] = ['short-curly', 'short-straight', 'long-curly', 'long-straight'];
    useEffect(() => {
        const loadStoredValues = async () => {
            const storedName = await getCharacterName();
            if (storedName) setName(storedName);

            const storedHair = await getHair();
            if (storedHair) {
                setSelectedHair(storedHair);
                setSelectedIndexHairType(getHairIndex(storedHair));
            }

            const storedHairColorCode = await getHairColor();
            if (storedHairColorCode) {
                setSelectedHairColorCode(storedHairColorCode);
                setSelectedIndexHairColor(getHairColorIndex(storedHairColorCode));
            }

            const storedSkinColorCode = await getSkinColor();
            if (storedSkinColorCode) {
                setSelectedSkinColorCode(storedSkinColorCode);
                setSelectedIndexSkinColor(getSkinColorIndex(storedSkinColorCode));
            }
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (isClient) await setCharacterName(newName);
    };

    const getHairIndex = (hairType: string): number => {
        return hairTypes.indexOf(hairType);
    };

    const handleImageClick = async (type: string) => {
        setSelectedHair(type);
        const index = getHairIndex(type);
        setSelectedIndexHairType(index);
        if (isClient) await setHair(type);
    };

    const handleHairColorClick = async (index: number) => {
        const colorWord = getHairColors()[index].code;
        setSelectedHairColorCode(colorWord);
        setSelectedIndexHairColor(index)
        if (isClient) await setHairColor(colorWord);
    };

    const handleSkinColorClick = async (index: number) => {
        const colorWord = getSkinColors()[index].code;
        setSelectedSkinColorCode(colorWord);
        setSelectedIndexSkinColor(index)
        if (isClient) await setSkinColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="character-image h-full w-full flex justify-center items-center">
            <CharacterImage hairColor={selectedHairColorCode} hairType={selectedHair}
                            skinColor={selectedSkinColorCode}></CharacterImage>
        </div>
    );

    const renderRightChildren = () => (
        <Layout>
            <h1 className="mb-4 text-center">Entwerfe deinen Charakter</h1>
            <h2 className="mb-4">Frisur</h2>
            <div>
                <SelectItems
                    onClick={(index) => {
                        const desc = hairTypes[index];
                        handleImageClick(desc);
                    }}
                    components={[
                        <CharacterImage
                            key="short-curly-hair"
                            hairColor={selectedHairColorCode}
                            hairType="short-curly-hair"
                            skinColor={selectedSkinColorCode}
                        />,
                        <CharacterImage
                            key="short-straight-hair"
                            hairColor={selectedHairColorCode}
                            hairType="short-straight-hair"
                            skinColor={selectedSkinColorCode}
                        />,
                        <CharacterImage
                            key="long-curly-hair"
                            hairColor={selectedHairColorCode}
                            hairType="long-curly-hair"
                            skinColor={selectedSkinColorCode}
                        />,
                        <CharacterImage
                            key="long-straight-hair"
                            hairColor={selectedHairColorCode}
                            hairType="long-straight-hair"
                            skinColor={selectedSkinColorCode}
                        />,
                    ]}
                    selectedIndex={selectedIndexHairType}
                />
            </div>
            <h2 className="mb-4">Haarfarbe</h2>
            <div>
                <SelectItems
                    onClick={handleHairColorClick}
                    colorCodes={getHairColors().map((color) => color.code)}
                    selectedIndex={selectedIndexHairColor}
                />
            </div>
            <h2 className="mb-4">Hautfarbe</h2>
            <div>
                <SelectItems
                    onClick={handleSkinColorClick}
                    colorCodes={getSkinColors().map((color) => color.code)}
                    selectedIndex={selectedIndexSkinColor}
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
                    placeholder="Name"
                    className="h2 w-full text-3xl text-black rounded-2xl border-2 border-black ml-2 p-2"
                />
            </div>
        </Layout>
    );

    // TODO: Implement routing logic
    const rocketPage = () => {
        // Implement navigation logic here
    };

    return (
        <div className="bg-star">
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
                actionButton={<ActionButton onClick={rocketPage}/>}
            />
        </div>
    );
};

export default Character;
