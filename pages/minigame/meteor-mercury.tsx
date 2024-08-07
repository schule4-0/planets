import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {getHair, getHairColor, getSkinColor} from '@/app/utils/storageUtils';
import SVGColorChanger from '@/app/components/svg/SVGColorChanger';

const CHARACTER_WIDTH = 20;
const CHARACTER_HEIGHT = 20;
const METEOR_FALL_SPEED = 3;
const METEOR_CREATION_INTERVAL = 800;
const SCORE_THRESHOLD = 125;

const getRandomSize = () => {
    return Math.random() * (12 - 6) + 6;
};

const MeteorMercury: React.FC = () => {
    const isClient = typeof window !== 'undefined';
    const router = useRouter();
    const [position, setPosition] = useState<number>(50);
    const [meteors, setMeteors] = useState<{
        id: number;
        position: number;
        top: number;
        width: number;
        height: number;
    }[]>([]);
    const [score, setScore] = useState<number>(0);
    const [selectedHair, setSelectedHair] = useState<string>('short-curly');
    const [selectedHairColorCode, setSelectedHairColorCode] = useState<string>('#000000');
    const [selectedSkinColorCode, setSelectedSkinColorCode] = useState<string>('#FCD8B1');
    const [showInstructions, setShowInstructions] = useState<boolean>(true);

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
                moveLeft();
            } else if (e.key === 'ArrowRight' && position < 100 - CHARACTER_WIDTH) {
                moveRight();
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
                {
                    id: Date.now(),
                    position: Math.floor(Math.random() * 100),
                    top: 0,
                    width: size,
                    height: size,
                },
            ]);
        }, METEOR_CREATION_INTERVAL);

        return () => clearInterval(meteorInterval);
    }, []);

    useEffect(() => {
        const gameInterval = setInterval(() => {
            setMeteors((prev) =>
                prev
                    .map((meteor) => ({...meteor, top: meteor.top + METEOR_FALL_SPEED}))
                    .filter((meteor) => {
                        const characterBounds = {
                            left: position + 5,
                            right: position - 5 + CHARACTER_WIDTH,
                            top: 100 - CHARACTER_HEIGHT,
                            bottom: 100,
                        };

                        const meteorBounds = {
                            left: meteor.position,
                            right: meteor.position + meteor.width,
                            top: meteor.top,
                            bottom: meteor.top + meteor.height,
                        };

                        const isCollision =
                            meteorBounds.left < characterBounds.right &&
                            meteorBounds.right > characterBounds.left &&
                            meteorBounds.bottom > characterBounds.top &&
                            meteorBounds.top < characterBounds.bottom;

                        if (isCollision) {
                            handleGameOver();
                            return false;
                        }
                        return meteorBounds.top < 95;
                    })
            );
            setScore((prev) => {
                const newScore = prev + 1;
                if (newScore >= SCORE_THRESHOLD) {
                    router.push('/spaceshipParts/mercury');
                }
                if (newScore === 20) {
                    setShowInstructions(false);
                }
                return newScore;
            });
        }, 200);

        return () => clearInterval(gameInterval);
    }, [position, router]);

    const handleGameOver = () => {
        console.log('Game Over! Your score: ' + score);
        setScore(0);
    };

    return (
        <div className="relative page-container bg-star overflow-hidden h-screen">
            <div className="text-white absolute top-4 left-4">Score: {score}</div>
            {showInstructions && (
                <div className="relative page-container bg-star align-middle">
                    <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white z-10">
                        Weiche den Meteoriten aus!
                    </h1>
                </div>
            )}
            <div className="absolute bottom-0 w-full h-12 z-20">
                <Image
                    src="/images/planets/ground/mercury_ground.png"
                    alt="Ground"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div
                className="absolute bottom-4 z-40"
                style={{
                    left: `${position}%`,
                    transition: 'left 0.1s',
                    width: `${CHARACTER_WIDTH}%`,
                    height: `${CHARACTER_HEIGHT}%`,
                }}
            >
                <SVGColorChanger
                    key="astro-caracter"
                    color={selectedHairColorCode}
                    type={'character/astro-' + selectedHair}
                    skinColor={selectedSkinColorCode}
                />
            </div>
            {meteors.map((meteor) => (
                <Image
                    key={meteor.id}
                    src="/images/meteor/meteorite.png"
                    className="absolute z-30"
                    style={{
                        left: `${meteor.position}%`,
                        top: `${meteor.top}%`,
                        width: `${meteor.width}%`,
                        height: `${meteor.height}%`,
                        transition: 'top 0.1s',
                    }}
                    width={100}
                    height={100}
                    alt="Meteor"
                />
            ))}
            {showInstructions && (
                <>
                    <div className="absolute bottom-24 left-8 text-white text-center z-50">
                        <p>Klicke um nach<br/>links zu laufen</p>
                    </div>
                    <div className="absolute bottom-24 right-8 text-white text-center z-50">
                        <p>Klicke um nach<br />rechts zu laufen</p>
                    </div>
                </>
            )}
            <button className="absolute bottom-8 left-8 z-50" onClick={moveLeft}>
                <Image src="/images/meteor/button_left.png" alt="Left" width={80} height={80}/>
            </button>
            <button className="absolute bottom-8 right-8 z-50" onClick={moveRight}>
                <Image src="/images/meteor/button_right.png" alt="Right" width={80} height={80}/>
            </button>
        </div>
    );
};

export default MeteorMercury;
