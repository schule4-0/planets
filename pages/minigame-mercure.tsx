import { useEffect, useState } from 'react';
import Image from 'next/image';

const CHARACTER_WIDTH = 5;
const CHARACTER_HEIGHT = 5;
const METEOR_WIDTH = 12;
const METEOR_HEIGHT = 12;
const METEOR_FALL_SPEED = 5;
const METEOR_CREATION_INTERVAL = 1000;
const COLLISION_THRESHOLD = 0.01;

const Home = () => {
    const [position, setPosition] = useState<number>(50);
    const [meteors, setMeteors] = useState<{ id: number; position: number; top: number }[]>([]);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' && position > 0) {
                setPosition((prev) => prev - 5);
            } else if (e.key === 'ArrowRight' && position < 100) {
                setPosition((prev) => prev + 5);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position]);

    useEffect(() => {
        const meteorInterval = setInterval(() => {
            setMeteors((prev) => [
                ...prev,
                { id: Date.now(), position: Math.floor(Math.random() * 100), top: 0 }
            ]);
        }, METEOR_CREATION_INTERVAL);

        return () => clearInterval(meteorInterval);
    }, []);

    useEffect(() => {
        const gameInterval = setInterval(() => {
            setMeteors((prev) =>
                prev.map((meteor) => ({ ...meteor, top: meteor.top + METEOR_FALL_SPEED }))
                    .filter((meteor) => {
                        const meteorBounds = {
                            left: meteor.position,
                            right: meteor.position + METEOR_WIDTH,
                            top: meteor.top,
                            bottom: meteor.top + METEOR_HEIGHT
                        };

                        const characterBounds = {
                            left: position,
                            right: position + CHARACTER_WIDTH,
                            top: (100 - CHARACTER_HEIGHT),
                            bottom: 100
                        };

                        const isCollision = (
                            meteorBounds.left < characterBounds.right - COLLISION_THRESHOLD &&
                            meteorBounds.right > characterBounds.left + COLLISION_THRESHOLD &&
                            meteorBounds.bottom > characterBounds.top + COLLISION_THRESHOLD &&
                            meteorBounds.top < characterBounds.bottom - COLLISION_THRESHOLD
                        );

                        if (isCollision) {
                            handleGameOver();
                            return false;
                        }
                        return meteorBounds.top < 100;
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
        <div className="relative page-container bg-star overflow-hidden">
            <div className="text-white absolute top-4 left-4">Score: {score}</div>
            <div
                className="absolute bottom-4"
                style={{ left: `${position}%`, transition: 'left 0.1s' }}
            >
                <Image src="/images/kids/astronaut.svg" alt="Character" width={48} height={48} />
            </div>
            {meteors.map((meteor) => (
                <img
                    key={meteor.id}
                    src="/images/mercury_minigame/meteorite.png"
                    className="absolute"
                    style={{
                        left: `${meteor.position}%`,
                        top: `${meteor.top}%`,
                        transition: 'top 0.1s',
                    }}
                    alt="Meteor"
                />
            ))}
        </div>
    );
};

export default Home;
