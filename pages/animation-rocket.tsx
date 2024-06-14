import React, {useEffect, useRef, useState} from 'react';
import lottie, {AnimationItem} from 'lottie-web';
import {useSearchParams} from 'next/navigation';
import {getRocketColor, getRocketType} from "@/app/utils/storageUtils";
import {getRocketColors} from "@/app/utils/colorUtils";

const LottieAnimation = () => {
    const isClient = typeof window !== 'undefined';
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem>(null);
    const searchParams = useSearchParams();
    const planet = searchParams ? searchParams.get('planet') : "earth";
    const landing = searchParams ? searchParams.get('landing') : "true";
    const [selectedColor, setSelectedRocketColor] = useState<string>('orange');
    const [selectedRocketType, setSelectedRocketType] = useState<string>('rocket1');


    useEffect(() => {
        const loadStoredValues = async () => {
            const selectedRocketType = await getRocketType();
            if (selectedRocketType) {
                setSelectedRocketType(selectedRocketType);
            }

            const storedRocketColors = await getRocketColor();
            if (storedRocketColors) {
                setSelectedRocketColor(storedRocketColors);
            }
        };

        if (isClient) loadStoredValues();
    }, [isClient]);

    useEffect(() => {
        let path = '/rocket.json'
        if (landing == "true"){
            path = '/rocketLanding.json'
        }
        // @ts-ignore
        animationRef.current = lottie.loadAnimation({
            // @ts-ignore
            container: containerRef.current? containerRef.current: <></>,
            path: path,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            name: "Demo Animation",
        });
        return () => {
            animationRef.current?.destroy();
        };
    }, [landing]);

    useEffect(() => {
        setTimeout(() => {
            const elements = document.querySelectorAll('*');
            const targetOpacity = '0.8';

            let targetElementOpacity: Element = document.createElement('div')

            elements.forEach(element => {
                const style = getComputedStyle(element);
                if (style.opacity === targetOpacity) {
                    targetElementOpacity = element;
                }
            });

            if (targetElementOpacity !== null) {
                targetElementOpacity.parentElement?.classList.add("hidden");
            }
            swapImage();
        }, 50);
    }, );

    const swapImage = () => {
        const animation = animationRef.current;
        if (animation && animation.renderer.elements.length > 0) {
            const elements = animation.renderer.elements;
            elements.some((element: { baseElement: { querySelector: (arg0: string) => any; }; }, index: number) => {
                if (index === 4) {
                    let image = element?.baseElement?.querySelector("image");
                    if (image) {
                        const colorWord = getRocketColors().find(color => color.code === selectedColor)?.word;
                        image.setAttribute('href', "/images/rocket/" + selectedRocketType + "_" + colorWord + ".png");
                    }
                }
                if (index === 8) {
                    const image = element?.baseElement?.querySelector("image");
                    if (image) {
                        image.setAttribute('href', "/images/planets/" + planet + ".png");
                    }
                    containerRef.current?.classList.remove("hidden")
                    return true;
                }
                return false;
            });
        }
    };

    return (
        <div className={`bg-star flex ${landing ? 'justify-end' : 'justify-start'} page-container`}>
            <div className={"w-auto h-full hidden"} ref={containerRef}></div>
        </div>
    );
};

export default LottieAnimation;
