import MemoryPage from "@/app/components/minigames/Memory/MemoryPage";
import cardData from '@/public/memory/VenusMemory.json';
import React from "react";
import { useRouter } from 'next/router';

const MemoryVenus = () => {
    const router = useRouter();

    const handleRouting = () => {
        router.push('/collect-venus');
    };

    return (
        <MemoryPage cardData={cardData} onEnd={handleRouting} />
    );
}

export default MemoryVenus;
