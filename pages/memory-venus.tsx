import MemoryPage from "@/app/components/minigames/Memory/MemoryPage";
import cardData from '@/public/memory/VenusMemory.json';
import React from "react";

const memoryVenus: React.FC = () => {
    return (
        <MemoryPage cardData={cardData} />
    );
}

export default memoryVenus;
