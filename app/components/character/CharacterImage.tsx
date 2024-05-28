import React, { useState, useEffect, useRef } from 'react';

interface CharacterImageProps {
    hairColor: string;
    hairType: string;
    skinColor: string;
}

const CharacterImage: React.FC<CharacterImageProps> = ({ hairColor, hairType, skinColor }) => {
    const svgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadSvg = async () => {
            try {
                let svgPath = `/images/kids/${hairType}.svg`;

                const response = await fetch(svgPath);
                const svgText = await response.text();

                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.documentElement;

                svgElement.innerHTML = svgElement.innerHTML.replace(/#hairColor/g, hairColor);
                svgElement.innerHTML = svgElement.innerHTML.replace(/#skinColor/g, skinColor);

                if (svgContainerRef.current) {
                    svgContainerRef.current.innerHTML = '';
                    svgElement.style.width = "100%";
                    svgElement.style.height = "100%";
                    svgContainerRef.current.appendChild(svgElement);
                }
            } catch (error) {
                console.error('Error loading SVG file:', error);
            }
        };

        loadSvg();
    }, [hairType, hairColor, skinColor]);

    return <div className={"w-full h-full"} ref={svgContainerRef}></div>;
};

export default CharacterImage;
