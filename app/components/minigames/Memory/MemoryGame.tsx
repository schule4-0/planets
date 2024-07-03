import { useState, useEffect } from 'react';
import Image from 'next/image';
import PopupWindow from './PopupWindow';
import type { FC } from 'react';
import ActionButton from "@/app/components/actionButton/ActionButton";
import "./MemoryGame.css"

interface CardImage {
    keyword: string;
    src: string;
    content: string;
}

interface CardData {
    page: { headline: string; content: string }[];
    cards: CardImage[];
}

interface MemoryGameProps {
    cardData: CardData;
    onEnd: () => void;
}

type Card = {
    id: number;
    keyword: string;
    src: string;
    matched: boolean;
};

const MemoryGame: FC<MemoryGameProps> = ({ cardData, onEnd }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [popupContent, setPopupContent] = useState<{ content: string; imageUrl: string } | null>(null);
    const [allMatched, setAllMatched] = useState<boolean>(false);
    const [flippedClasses, setFlippedClasses] = useState<number[]>([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledCards = shuffleArray(generateInitialCards());
        setCards(shuffledCards);
    };

    const generateInitialCards = (): Card[] => {
        const duplicatedImages = cardData.cards.flatMap((image: CardImage) => [image, image]);
        return shuffleArray(duplicatedImages.map((image, index) => ({ id: index, ...image, matched: false })));
    };

    const shuffleArray = (array: any[]): any[] => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (index: number) => {
        if (flipped.length === 2 || matched.includes(index) || flipped.includes(index)) return;

        const newFlipped = [...flipped, index];
        const newFlippedClasses = [...flippedClasses, index];
        setFlippedClasses(newFlippedClasses);

        setTimeout(() => {
            setFlipped(newFlipped);
        }, 270); // Change image while animation


        if (newFlipped.length === 2) {
            const [firstIndex, secondIndex] = newFlipped;
            if (cards[firstIndex].keyword === cards[secondIndex].keyword) {
                setMatched([...matched, firstIndex, secondIndex]);
                showPopup(cards[firstIndex].keyword);
            }
            setTimeout(() => {
                setFlipped([]);
                setFlippedClasses([]);
            }, 1000);
        }
    };

    const showPopup = (keyword: string) => {
        const matchedImage = cardData.cards.find(image => image.keyword === keyword);
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

    const nextPage = () => {
        onEnd();
    };

    return (
        <div className="grid grid-cols-4 gap-4 bg-star">
            {cards.map((card, index) => (
                <Image
                    key={card.id}
                    className={`w-[157px] h-[157px] hover:cursor-pointer flip-card ${flippedClasses.includes(index) ? 'flip-card-back' : ''}`}
                    onClick={() => handleCardClick(index)}
                    src={flipped.includes(index) || matched.includes(index) ? card.src : '/images/memory/rocket_card.svg'}
                    alt={card.keyword}
                    width={157}
                    height={157}
                />
            ))}
            {popupContent && (
                <PopupWindow content={popupContent.content} imageUrl={popupContent.imageUrl} onClose={handleClosePopup} />
            )}
            {allMatched && <ActionButton onClick={nextPage} />}
        </div>
    );
};

export default MemoryGame;
