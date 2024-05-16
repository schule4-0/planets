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
        { code: "#FF9900", word: "orange" },
        { code: "#5EC71E", word: "green" },
        { code: "#0E5CF3", word: "blue" },
        { code: "#CA0000", word: "red" },
        { code: "#FF00F5", word: "pink" },
        { code: "#7A41F3", word: "purple" },
        { code: "#FFE500", word: "yellow" }
    ];

    const renderLeftChildren = () => {
        if (isClient) {
            const selectedImage = localStorage.getItem('spaceshipSelectedImageIndex') ? parseInt(localStorage.getItem('spaceshipSelectedImageIndex')!) : selectedImageIndex;
            const selectedColor = localStorage.getItem('spaceshipSelectedColorIndex') ? parseInt(localStorage.getItem('spaceshipSelectedColorIndex')!) : selectedColorIndex;
            return (
                <div>
                    <div className="text-center mt-2">
                        <Image
                            src={`/images/spaceshipform${selectedImage}_${colors[selectedColor].word}.svg`}
                            alt="Spaceship"
                            width={250}
                            height={250}
                        />
                    </div>
                </div>
            );
        } else {
            return null;
        }
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
                                { src: `/images/spaceshipform0_${colorWord}.svg`, desc: "Form 1" },
                                { src: `/images/spaceshipform1_${colorWord}.svg`, desc: "Form 2" },
                            ]} />
                        </div>
                        <h2 className="font-bold mb-4">Farbe</h2>
                        <div className="text-center">
                            <SelectItems onClick={handleColorClick} colorCodes={colors.map(color => color.code)} />
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
    );
};

export default Spaceship;
