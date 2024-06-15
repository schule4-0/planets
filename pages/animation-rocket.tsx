import React, { useEffect, useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { useSearchParams } from 'next/navigation';
import { getRocketColor, getRocketType } from "@/app/utils/storageUtils";
import { getRocketColors } from "@/app/utils/colorUtils";

const LottieAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const searchParams = useSearchParams();
    const planet = searchParams ? searchParams.get('planet') : "earth";
    const landing = searchParams ? searchParams.get('landing') : "true";
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');

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
        const animationPath = landing === "true" ? '/rocketLanding.json' : '/rocket.json';

        if (containerRef.current) {
            animationRef.current = lottie.loadAnimation({
                container: containerRef.current,
                path: animationPath,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name: "Demo Animation",
            });
        }

        return () => {
            animationRef.current?.destroy();
        };
    }, [landing]);

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

            swapImage();
        }, 50);
    }, [selectedColor, selectedRocketType, planet]);

    const swapImage = () => {
        if (animationRef.current) {
            const elements = animationRef.current.renderer.elements;
            elements.forEach((element: any, index: number) => {
                if (index === 4) {
                    const image = element?.baseElement?.querySelector("image");
                    if (image) {
                        const colorWord = getRocketColors().find(color => color.code === selectedColor)?.word;
                        image.setAttribute('href', `/images/rocket/${selectedRocketType}_${colorWord}.png`);
                    }
                }
                if (index === 8) {
                    const image = element?.baseElement?.querySelector("image");
                    if (image) {
                        image.setAttribute('href', `/images/planets/${planet}.png`);
                    }
                    containerRef.current?.classList.remove("hidden");
                }
            });
        }
    };

    return (
        <div className={`bg-star flex ${landing ? 'justify-end' : 'justify-start'} page-container`}>
            <div className="w-auto h-full hidden" ref={containerRef}></div>
        </div>
    );
};

export default LottieAnimation;