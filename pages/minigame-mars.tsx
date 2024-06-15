import React from 'react';
import { useRouter } from 'next/router';
import TextDragAndDrop from "@/app/components/textDragAndDrop/TextDragAndDrop";
import JsonData from "@/public/jsons/minigame-venus.json"
import ActionButton from "@/app/components/actionButton/ActionButton";

const MinigameMars: React.FC = () => {
    const router = useRouter();
    const handleRouting = () => {
        router.push('/collect-mars');
    };

    return (
        <div className="bg-star min-page-container">
            <TextDragAndDrop jsonFile={JsonData} actionButton={<ActionButton onClick={handleRouting} />}/>
        </div>
    );
};

export default MinigameMars;