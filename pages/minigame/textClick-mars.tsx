import React from 'react';
import { useRouter } from 'next/router';
import TextClick from "@/app/components/textClick/TextClick";
import JsonData from "@/public/json/minigame/clickText-mars.json"
import ActionButton from "@/app/components/actionButton/ActionButton";

const TextClickMars: React.FC = () => {
    const router = useRouter();
    const handleRouting = () => {
        router.push('/spaceshipParts/mars');
    };

    return (
        <div className="bg-star min-page-container">
            <TextClick jsonFile={JsonData} actionButton={<ActionButton onClick={handleRouting} />}/>
        </div>
    );
};

export default TextClickMars;