import React, { useState, useEffect } from 'react';
import Layout from '../app/layout';
import SelectLayout from "@/app/selectLayout";
import ActionButton from "@/app/components/actionButton/ActionButton";
import SelectItems from "@/app/components/selectItems/selectItems";
import "../app/globals.css";
import Image from "next/image";

interface Color {
    code: string;
    word: string;
}

const Spaceship: React.FC = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);

        const storedImageIndex = localStorage.getItem('spaceshipSelectedImageIndex');
        if (storedImageIndex) {
            setSelectedImageIndex(parseInt(storedImageIndex));
        }

        const storedColorIndex = localStorage.getItem('spaceshipSelectedColorIndex');
        if (storedColorIndex) {
            setSelectedColorIndex(parseInt(storedColorIndex));
        }
    }, []);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        localStorage.setItem('spaceshipSelectedImageIndex', index.toString());
    };

    const handleColorClick = (index: number) => {
        setSelectedColorIndex(index);
        localStorage.setItem('spaceshipSelectedColorIndex', index.toString());
    };

    const colors: Color[] = [
        { code: "#000000", word: "dark" },
        { code: "#A52A2A", word: "brown" },
        { code: "#DC143C", word: "crimson" },
        { code: "#FF8C00", word: "darkorange" },
        { code: "#FFD700", word: "gold" },
        { code: "#ADFF2F", word: "greenyellow" },
        { code: "#4B0082", word: "indigo" },
        { code: "#FF69B4", word: "hotpink" },
    ];

    const renderLeftChildren = () => {
        return (
            <div>
                <div className="text-center mt-2">
                    <Image
                        src={`/images/spaceship1_${colors[selectedColorIndex].word}.svg`}
                        alt="Spaceship"
                        width={250}
                        height={250}
                    />
                </div>
            </div>
        )
    };

    const renderRightChildren = () => {
        if (isClient) {
            const colorWord = colors[selectedColorIndex].word;
            return (
                <Layout>
                    <div>
                        <h2 className="font-bold mb-4 text-center">Baue deine Rakete</h2>
                        <h2 className="font-bold mb-4">Flügelform</h2>
                        <div className="text-center">
                            <SelectItems onClick={handleImageClick} images={[
                                {src: `/images/spaceship1_${colorWord}.svg`, desc: "Form 1"},
                                {src: `/images/spaceship2_${colorWord}.svg`, desc: "Form 2"},
                            ]}/>
                        </div>
                        <h2 className="font-bold mb-4">Farbe</h2>
                        <div className="text-center">
                            <SelectItems onClick={handleColorClick} colorCodes={colors.map(color => color.code)}/>
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
                actionButton={<ActionButton onClick={() => {
                    localStorage.removeItem('spaceshipSelectedImageIndex');
                    localStorage.removeItem('spaceshipSelectedColorIndex');
                    setSelectedImageIndex(0);
                    setSelectedColorIndex(0);
                }} />}
            />
        </div>
    )
};

export default Spaceship;
