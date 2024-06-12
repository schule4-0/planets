import React, {useEffect, useRef} from 'react';

interface CharacterImageProps {
    color: string;
    type: string;
    skinColor?: string;
}

const SVGColorChanger: React.FC<CharacterImageProps> = ({color, type, skinColor}) => {
    const svgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadSvg = async () => {
            try {
                let svgPath = `/images/${type}.svg`;

                const response = await fetch(svgPath);
                const svgText = await response.text();

                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.documentElement;

                svgElement.innerHTML = svgElement.innerHTML.replace(/#color/g, color);
                if (skinColor) {
                    svgElement.innerHTML = svgElement.innerHTML.replace(/#skinColor/g, skinColor);
                }

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
    }, [type, color, skinColor]);

    return <div className={"w-full h-full"} ref={svgContainerRef}></div>;
};

export default SVGColorChanger;
