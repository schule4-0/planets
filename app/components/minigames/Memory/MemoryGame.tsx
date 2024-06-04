import { useState, useEffect } from 'react';
import Image from 'next/image';
import PopupWindow from './PopupWindow';
import type { FC } from 'react';
import ActionButton from "@/app/components/actionButton/ActionButton";

type Card = {
    id: number;
    keyword: string;
    src: string;
    matched: boolean;
};

const cardImages = [
    { keyword: 'atmosphere', src: '/images/memory/atmosphere.svg', content: 'Die Atmosphäre der Venus besteht hauptsächlich aus Kohlendioxid und erzeugt einen starken Treibhauseffekt.' },
    { keyword: 'cloud', src: '/images/memory/cloud.svg', content: 'Die Venus hat eine dichte Wolkendecke aus Schwefelsäure, die sie gelblich erscheinen lässt.' },
    { keyword: 'earth_venus', src: '/images/memory/earth_venus.svg', content: 'Die Venus wird oft als Schwesterplanet der Erde bezeichnet, da sie fast gleich groß ist.' },
    { keyword: 'distance', src: '/images/memory/distance.svg', content: 'Zur Venus kann man nur mit einer Rakete fliegen, denn sie ist 40 Millionen Kilometer von der Erde entfernt.' },
    { keyword: 'temperature', src: '/images/memory/temperature.svg', content: 'Die Venus ist der heißeste Planet in unserem Sonnensystem mit Durchschnittstemperaturen von etwa 465 Grad Celsius.' },
    { keyword: 'vulcan', src: '/images/memory/vulcan.svg', content: 'Die Venus ist voll von Vulkanen. Einige davon sind möglicherweise noch aktiv!' },
];

const MemoryGame: FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [popupContent, setPopupContent] = useState<{ content: string; imageUrl: string } | null>(null);
    const [allMatched, setAllMatched] = useState<boolean>(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledCards = shuffleArray(generateInitialCards());
        setCards(shuffledCards);
    };

    const generateInitialCards = (): Card[] => {
        const duplicatedImages = cardImages.flatMap(image => [image, image]);
        return shuffleArray(duplicatedImages.map((image, index) => ({ id: index, ...image, matched: false })));
    };

    const shuffleArray = (array: any[]): any[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (index: number) => {
        if (flipped.length === 2 || matched.includes(index) || flipped.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [firstIndex, secondIndex] = newFlipped;
            if (cards[firstIndex].keyword === cards[secondIndex].keyword) {
                setMatched([...matched, firstIndex, secondIndex]);
                showPopup(cards[firstIndex].keyword);
            }
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    const showPopup = (keyword: string) => {
        const matchedImage = cardImages.find(image => image.keyword === keyword);
        if (matchedImage) {
            setPopupContent({ content: matchedImage.content, imageUrl: matchedImage.src });
        }
    };

    const handleClosePopup = () => {
        setPopupContent(null);
        if (matched.length === cards.length) {
            setAllMatched(true);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 bg-star">
            {cards.map((card, index) => (
                <div key={card.id} className="relative w-[157px] h-[157px]" onClick={() => handleCardClick(index)}>
                    <Image src={flipped.includes(index) || matched.includes(index) ? card.src : '/images/memory/rocket_card.svg'} alt={card.keyword} width={157} height={157} />
                </div>
            ))}
            {popupContent && (
                <PopupWindow content={popupContent.content} imageUrl={popupContent.imageUrl} onClose={handleClosePopup} />
            )}
            {allMatched && <ActionButton onClick={() => console.log("Action button clicked" + allMatched)} />}
        </div>
    );
};

export default MemoryGame;
