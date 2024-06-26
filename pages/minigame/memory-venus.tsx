import MemoryPage from "@/app/components/minigames/Memory/MemoryPage";
import cardData from '@/public/json/minigame/memory-venus.json';
import React from "react";
import { useRouter } from 'next/router';

const MemoryVenus = () => {
    const router = useRouter();

    const handleRouting = () => {
        router.push('/spaceshipParts/venus');
    };

    return (
        <MemoryPage cardData={cardData} onEnd={handleRouting} />
    );
}

export default MemoryVenus;
