import React from "react";
import MemoryGame from "@/app/components/minigames/Memory/MemoryGame";

interface CardImage {
    keyword: string;
    src: string;
    content: string;
}

interface CardData {
    page: { headline: string; content: string }[];
    cards: CardImage[];
}

interface MemoryPageProps {
    cardData: CardData;
}

const MemoryPage: React.FC<MemoryPageProps> = ({cardData}) => {
    const {headline, content} = cardData.page[0];

    return (
        <div className="flex flex-col justify-center items-center min-page-container bg-star p-4">
            <div className="text-center mb-4">
                <h1 className="mb-16">{headline}</h1>
                <h2 className="mb-8">{content}</h2>
            </div>
            <MemoryGame cardData={cardData}/>
        </div>
    );
}

export default MemoryPage;
