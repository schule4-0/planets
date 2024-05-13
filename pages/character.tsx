import React, { useState, useEffect, useRef } from 'react';
import Layout from '../app/layout';
import SelectLayout from "@/app/selectLayout";
import ActionButton from "@/app/components/actionButton/ActionButton";
import SelectItems from "@/app/components/selectItems/selectItems";
import "./character.css"
import Image from "next/image";

interface Color {
    code: string;
    word: string;
}

const Character: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsClient(true);
        const storedName = localStorage.getItem('characterName');
        if (storedName) {
            setName(storedName);
        }

        const storedImageIndex = localStorage.getItem('selectedImageIndex');
        if (storedImageIndex) {
            setSelectedImageIndex(parseInt(storedImageIndex));
        }

        const storedColorIndex = localStorage.getItem('selectedColorIndex');
        if (storedColorIndex) {
            setSelectedColorIndex(parseInt(storedColorIndex));
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        localStorage.setItem('characterName', newName);
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        localStorage.setItem('selectedImageIndex', index.toString());
    };

    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        localStorage.setItem('selectedColorIndex', index.toString());
    };

    const colors: Color[] = [
        { code: "#000000", word: "dark" },
        { code: "#FFCB48", word: "blonde" },
        { code: "#673614", word: "brown" },
        { code: "#DF5026", word: "orange" }
    ];

    const getColorWord = (colorCode: string) => {
        const color = colors.find(c => c.code === colorCode);
        return color ? color.word : "Unknown";
    };

    const clearImageLocalStorage = () => {
        localStorage.removeItem('selectedImageIndex');
        localStorage.removeItem('selectedColorIndex');
        setSelectedImageIndex(0);
    };


    const renderLeftChildren = () => {
        if (isClient) {
            const selectedImage = localStorage.getItem('selectedImageIndex') ? parseInt(localStorage.getItem('selectedImageIndex')!) : selectedImageIndex;
            const selectedColor = localStorage.getItem('selectedColorIndex') ? parseInt(localStorage.getItem('selectedColorIndex')!) : selectedColorIndex;
            const colorCode = colors[selectedColor].code;
            const colorWord = getColorWord(colorCode);
            return (
                <div className="h-full w-auto flex justify-center items-center">
                    <Image className="character-image" src={`/images/${selectedImage === 0 ? 'girl' : 'boy'}_${colorWord}.svg`}
                           alt="Selected Character"  width={400} height={627} />
                </div>
            );
        } else {
            return null;
        }
    };

    const renderRightChildren = () => {
        if (isClient) {
            const selectedColor = localStorage.getItem('selectedColorIndex') ? parseInt(localStorage.getItem('selectedColorIndex')!) : selectedColorIndex;
            const colorCode = colors[selectedColor].code;
            const colorWord = getColorWord(colorCode);
            return (
                <Layout>
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-center">Bau deinen Charakter</h1>
                        <h2 className="text-4xl font-bold mb-4">Geschlecht</h2>
                        <div className="text-center">
                            <SelectItems onClick={handleImageClick} images={[
                                {src: `/images/girl_${colorWord}.svg`, desc: "Weiblich"},
                                {src: `/images/boy_${colorWord}.svg`, desc: "Männlich"},
                            ]}/>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Haarfarbe</h2>
                        <div className="text-center">
                            <SelectItems onClick={handleColorClick} colorCodes={colors.map(color => color.code)}/>
                        </div>
                        <div>
                            <div>
                                <div className="flex items-center mb-4">
                                    <label className="text-4xl font-bold">Name </label>
                                    <input
                                        ref={nameInputRef}
                                        id="nameInput"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Trage deinen Namen ein"
                                        className="w-full text-4xl text-black rounded-2xl border-2 border-black ml-2 p-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            );
        } else {
            return null;
        }
    };
    return (
        <div>
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
                actionButton={<ActionButton onClick={clearImageLocalStorage} />}
            />
        </div>
    )
};

export default Character;
