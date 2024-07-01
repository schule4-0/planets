import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { useSearchParams } from 'next/navigation';
import { getRocketColor, getRocketType } from "@/app/utils/storageUtils";
import { getRocketColors } from "@/app/utils/colorUtils";
import { useRouter } from "next/router";

const AnimationRocket = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const searchParams = useSearchParams();
    const planet = searchParams ? searchParams.get('planet') : "earth";
    const landing = searchParams ? searchParams.get('landing') : null;
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');
    const router = useRouter();

    useEffect(() => {
        const loadStoredValues = async () => {
            const rocketType = await getRocketType();
            if (rocketType) {
                setSelectedRocketType(rocketType);
            }

            const rocketColors = await getRocketColor();
            if (rocketColors) {
                setSelectedRocketColor(rocketColors);
            }
        };

        loadStoredValues();
    }, []);

    useEffect(() => {
        if (landing === null) return;

        const animationPath = landing === "true" ? '/animation/rocketLanding.json' : 'animation/rocket.json';

        if (containerRef.current) {
            animationRef.current = lottie.loadAnimation({
                container: containerRef.current,
                path: animationPath,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                name: "Rocket",
            });
        }

        animationRef.current?.addEventListener('complete', onAnimationComplete);

        return () => {
            animationRef.current?.destroy();
        };
    }, [landing]);

    const onAnimationComplete = () => {
        if (landing === "true") {
            if(planet=== "earth"){
                router.push("/dialog/earth3");
            }else {
                router.push("/dialog/" + planet);
            }
        } else {
            router.push("/map");
        }
    };

    useEffect(() => {
        if (landing === null) return;

        setTimeout(() => {
            const elements = document.querySelectorAll('*');
            const targetOpacity = '0.8';

            elements.forEach(element => {
                const style = getComputedStyle(element);
                if (style.opacity === targetOpacity) {
                    element.parentElement?.classList.add("hidden");
                }
            });

            swapImage();
        }, 50);
    }, [selectedColor, selectedRocketType, planet, landing]);

    const swapImage = () => {
        if (animationRef.current) {
            const elements = animationRef.current.renderer.elements;
            elements.forEach((element: any, index: number) => {
                const image = element?.baseElement?.querySelector("image");
                if (image) {
                    if (index === 4 && landing === "false" || landing === "true" && index === 1) {
                        const colorWord = getRocketColors().find(color => color.code === selectedColor)?.word;
                        image.setAttribute('href', `/images/rocket/${selectedRocketType}_${colorWord}.png`);
                    }
                    if (index === 8 && landing === "false" || landing === "true" && index === 2) {
                        image.setAttribute('href', `/images/planets/${planet}.png`);
                    }
                }
            });
        }
        containerRef.current?.classList.remove("hidden");
    };

    return (
        <>
            {landing && (
                <div className={`bg-star flex ${landing === "true" ? 'justify-start' : 'justify-end'} page-container`}>
                    <div className="w-auto h-full hidden" ref={containerRef}></div>
                </div>
            )}
        </>
    );
};

export default AnimationRocket;
