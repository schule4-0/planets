import React from "react";
import MemoryGame from "@/app/components/minigames/Memory/MemoryGame";
import cardData from '@/public/memory/VenusMemory.json';

const MemoryPage: React.FC = () => {
    const headline = cardData.page[0].headline;
    const content = cardData.page[0].content;

    return (
        <div className="flex flex-col justify-center items-center page-container bg-star p-4">
            <div className="text-center mb-4">
                <h1 className="mb-16 h1">{headline}</h1>
                <h2 className="mb-8 h2">{content}</h2>
            </div>
            <MemoryGame />
        </div>
    );
}

export default MemoryPage;
