import { useRouter } from "next/router";
import React, {useEffect, useRef} from "react";
import {getCharacterName} from "@/app/utils/storageUtils";
import ActionButton from "@/app/components/actionButton/ActionButton";
import lottie, {AnimationItem} from "lottie-web";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCharacterName = async () => {
                const characterName = await getCharacterName();
                if (characterName !== null && characterName !== "") {
                    router.push('/map');
                }
        };
        fetchCharacterName();
    }, []);

    const handleRouting = () => {
        router.push('/build-character');
    };

    return (
        <div className={"bg-star page-container flex items-center justify-center"}>
            <h1 className={"px-32 text-center"}>Um dein Weltraumabenteuer zu starten drücke den Button!</h1>
            <ActionButton onClick={handleRouting}/>
        </div>
    );
}
