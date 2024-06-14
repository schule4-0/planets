import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {getCharacterName, getHair, getHairColor, getSkinColor} from "@/app/utils/storageUtils";
import {getHairColorIndex, getSkinColorIndex} from "@/app/utils/colorUtils";
import SVGColorChanger from "@/app/components/svg/SVGColorChanger";

const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 20;
const METEOR_FALL_SPEED = 3;
const METEOR_CREATION_INTERVAL = 1500;

const getRandomSize = () => {
    return Math.random() * (12 - 6) + 6;
};

const Home: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const [position, setPosition] = useState<number>(50);
    const [meteors, setMeteors] = useState<{ id: number; position: number; top: number; width: number; height: number }[]>([]);
    const [score, setScore] = useState<number>(0);
    const [selectedHair, setSelectedHair] = useState<string>('short-curly')
    const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
    const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
    useEffect(() => {
        const loadStoredValues = async () => {
            if (isClient) {
                const storedHair = await getHair();
                if (storedHair) {
                    setSelectedHair(storedHair);
                }

                const storedHairColorCode = await getHairColor();
                if (storedHairColorCode) {
                    setSelectedHairColorCode(storedHairColorCode);
                }

                const storedSkinColorCode = await getSkinColor();
                if (storedSkinColorCode) {
                    setSelectedSkinColorCode(storedSkinColorCode);
                }
            }
        };
        loadStoredValues();
    }, [isClient]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && position > 0) {
                setPosition((prev) => Math.max(prev - 5, 0));
            } else if (e.key === 'ArrowRight' && position < (100 - CHARACTER_WIDTH)) {
                setPosition((prev) => Math.min(prev + 5, 100 - CHARACTER_WIDTH));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position]);

    const moveLeft = () => {
        setPosition((prev) => Math.max(prev - 5, 0));
    };

    const moveRight = () => {
        setPosition((prev) => Math.min(prev + 5, 100 - CHARACTER_WIDTH));
    };

    useEffect(() => {
        const meteorInterval = setInterval(() => {
            const size = getRandomSize();
            setMeteors((prev) => [
                ...prev,
                { id: Date.now(), position: Math.floor(Math.random() * 100), top: 0, width: size, height: size }
            ]);
        }, METEOR_CREATION_INTERVAL);

        return () => clearInterval(meteorInterval);
    }, []);

    useEffect(() => {
        const gameInterval = setInterval(() => {
            setMeteors((prev) =>
                prev.map((meteor) => ({ ...meteor, top: meteor.top + METEOR_FALL_SPEED }))
                    .filter((meteor) => {
                        const characterBounds = {
                            left: position -5 ,
                            right: position -5 + CHARACTER_WIDTH,
                            top: 100 - CHARACTER_HEIGHT,
                            bottom: 100
                        };

                        const meteorBounds = {
                            left: meteor.position,
                            right: meteor.position + meteor.width,
                            top: meteor.top,
                            bottom: meteor.top + meteor.height
                        };

                        const isCollision = (
                            meteorBounds.left < characterBounds.right &&
                            meteorBounds.right > characterBounds.left &&
                            meteorBounds.bottom > characterBounds.top &&
                            meteorBounds.top < characterBounds.bottom

                        );

                        if (isCollision) {
                            handleGameOver();
                            return false;
                        }
                        return meteorBounds.top < 95;
                    })
            );
            setScore((prev) => prev + 1);
        }, 200);

        return () => clearInterval(gameInterval);
    }, [position]);

    const handleGameOver = () => {
        alert('Game Over! Your score: ' + score);
        setScore(0);
    };

    return (
        <div className="relative page-container bg-star overflow-hidden h-screen">
            <div className="text-white absolute top-4 left-4">Score: {score}</div>
            <div className="absolute bottom-0 w-full h-4" style={{ zIndex: 4 }}>
                <Image src="/images/mercury_minigame/meteorite_ground.png" alt="Ground" layout="fill" objectFit="cover" />
            </div>
            <div
                className="absolute bottom-4"
                style={{ left: `${position}%`, transition: 'left 0.1s', width: `${CHARACTER_WIDTH}%`, height: `${CHARACTER_HEIGHT}%`, zIndex: 3 }}
            >
                <SVGColorChanger
                    key="astro-caracter"
                    color={selectedHairColorCode}
                    type={"kids/astro-" + selectedHair}
                    skinColor={selectedSkinColorCode}
                />,
            </div>
            {meteors.map((meteor) => (
                <img
                    key={meteor.id}
                    src="/images/mercury_minigame/meteorite.png"
                    className="absolute"
                    style={{
                        left: `${meteor.position}%`,
                        top: `${meteor.top}%`,
                        width: `${meteor.width}%`,
                        height: `${meteor.height}%`,
                        transition: 'top 0.1s',
                        zIndex: 3
                    }}
                    alt="Meteor"
                />
            ))}
            <button className="absolute bottom-8 left-8" onClick={moveLeft} style={{ zIndex: 4 }}>
                <Image src="/images/mercury_minigame/button_left.png" alt="Left" width={64} height={64} />
            </button>
            <button className="absolute bottom-8 right-8" onClick={moveRight} style={{ zIndex: 4 }}>
                <Image src="/images/mercury_minigame/button_right.png" alt="Right" width={64} height={64} />
            </button>
        </div>
    );
};

export default Home;
