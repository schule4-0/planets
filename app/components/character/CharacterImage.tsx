import React, { useState, useEffect } from 'react';

interface CharacterImageProps {
    hairColor: string;
    lastHairColor: string;
    hairType: string;
    skinColor: string;
}
const CharacterImage: React.FC<CharacterImageProps> = ({ hairColor, hairType, skinColor, lastHairColor }) => {
    const [svgContent, setSvgContent] = useState<string>('');

    useEffect(() => {
        const loadSvg = async () => {
            try {
                let svgPath = '';
                if (hairType === "short-curly") {
                    svgPath = '/images/kids/short-curly.svg';
                } else if (hairType === "short-straight") {
                    svgPath = '/images/kids/short-straight.svg';
                } else {
                    svgPath = '/images/kids/short-curly.svg';
                }

                // Fetch SVG content
                const response = await fetch(svgPath);
                const svgData = await response.text();
                setSvgContent(svgData);
            } catch (error) {
                console.error('Error loading SVG file:', error);
            }
        };

        loadSvg();
    }, [hairType]);

    useEffect(() => {
        if (svgContent) {
            let modifiedSvgContent = svgContent.replace(/#haircolor/g, hairColor);
            modifiedSvgContent = modifiedSvgContent.replace(new RegExp(lastHairColor, 'g'), hairColor);
            setSvgContent(modifiedSvgContent);
        }
    }, [hairColor, svgContent]);

    return (
        <div>
            <div style={{width: 200}} dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
    );
};

export default CharacterImage;
