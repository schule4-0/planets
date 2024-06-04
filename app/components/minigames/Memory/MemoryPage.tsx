import MemoryGame from "@/app/components/minigames/Memory/MemoryGame";
import React from "react";

const MemoryPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-star p-4">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-bold mb-16 h1">Venus Entdeckungen: Ein Gedächtnisspiel</h1>
                <h2 className="text-xl font-medium mb-8 h2">Decke abwechselnd zwei Karten auf und sammle Paare von passenden Bildern, um mehr über die Venus zu lernen.</h2>
            </div>
            <MemoryGame />
        </div>
    );
}

export default MemoryPage;

