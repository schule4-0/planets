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

    useEffect(() => {
        const animationPath = '/animation/startPage.json';

        if (containerRef.current) {
            animationRef.current = lottie.loadAnimation({
                container: containerRef.current,
                path: animationPath,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                name: "Start Lottie",
            });
        }
        animationRef.current?.addEventListener('complete', onAnimationComplete);

        return () => {
            animationRef.current?.destroy();
        };
    }, []);

    const onAnimationComplete = () => {
        if (containerRef.current){
            containerRef.current.style.zIndex = "unset";
        }
    };

    useEffect(() => {
        setTimeout(() => {
            const elements = document.querySelectorAll('*');
            const targetOpacity = '0.8';

            elements.forEach(element => {
                const style = getComputedStyle(element);
                if (style.opacity === targetOpacity) {
                    element.parentElement?.classList.add("hidden");
                }
            });
        }, 50);
    }, []);

    return (
        <div className={"bg-star page-container flex items-center justify-center"}>
            <div className="w-full h-full top-0 absolute z-50" ref={containerRef}></div>
            <h1 className={"px-32 text-center"}>Um dein Weltraumabenteuer zu starten drücke den Button!</h1>
            <ActionButton onClick={handleRouting}/>
        </div>
    );
}
