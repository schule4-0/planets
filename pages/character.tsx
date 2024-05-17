import React, { useEffect, useRef, useState } from 'react';
import Layout from '../app/layout';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import SelectItems from '@/app/components/selectItems/selectItems';
import './character.css';
import '../app/globals.css';
import Image from 'next/image';
import { getGender, getHairColor, getCharacterName, setGender, setHairColor, setCharacterName } from '@/app/utils/storageUtils';
import { getHairColors } from '@/app/utils/colorUtils';

const Character: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [name, setName] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string>('girl');
    const [selectedColorWord, setSelectedColorWord] = useState<string>('dark');
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadStoredValues = async () => {
            const storedName = await getCharacterName();
            if (storedName) setName(storedName);

            const storedImageType = await getGender();
            if (storedImageType) setSelectedGender(storedImageType);

            const storedColorWord = await getHairColor();
            if (storedColorWord) setSelectedColorWord(storedColorWord);
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        if (isClient) await setCharacterName(newName);
    };

    const handleImageClick = async (type: string) => {
        setSelectedGender(type);
        if (isClient) await setGender(type);
    };

    const handleColorClick = async (index: number) => {
        const colorWord = getHairColors()[index].word;
        setSelectedColorWord(colorWord);
        if (isClient) await setHairColor(colorWord);
    };

    const renderLeftChildren = () => (
        <div className="h-full w-auto flex justify-center items-center">
            <Image
                className="character-image"
                src={`/images/${selectedGender}_${selectedColorWord}.svg`}
                alt="Selected Character"
                width={400}
                height={627}
            />
        </div>
    );

    const renderRightChildren = () => (
        <Layout>
            <div>
                <h1 className="font-bold mb-4 text-center">Entwerfe deinen Charakter</h1>
                <h2 className="font-bold mb-4">Geschlecht</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={(index) => handleImageClick(index === 0 ? 'girl' : 'boy')}
                        images={[
                            { src: `/images/girl_${selectedColorWord}.svg`, desc: 'weiblich' },
                            { src: `/images/boy_${selectedColorWord}.svg`, desc: 'männlich' },
                        ]}
                    />
                </div>
                <h2 className="font-bold mb-4">Haarfarbe</h2>
                <div className="text-center">
                    <SelectItems
                        onClick={handleColorClick}
                        colorCodes={getHairColors().map((color) => color.code)}
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="h2 font-bold">Name</label>
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
                actionButton={<ActionButton onClick={rocketPage} />}
            />
        </div>
    );
};

export default Character;
