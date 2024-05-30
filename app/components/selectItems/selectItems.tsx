import React, { useState } from 'react';
import Image from "next/image";

interface ImageItem {
    src: string;
    desc: string;
}

interface SelectItemsProps {
    images?: ImageItem[];
    colorCodes?: string[];
    components?: React.ReactNode[];
    onClick: (index: number) => void;
    selectedIndex: number;
}

const SelectItems: React.FC<SelectItemsProps> = ({images, colorCodes, components, onClick, selectedIndex}) => {

    const handleItemClick = (index: number) => {
        onClick(index);
    };

    const renderImages = () => {
        if (images) {
            return images.map((image, index) => (
                <div
                    key={index}
                    onClick={() => handleItemClick(index)}
                    className={`hover:cursor-pointer mb-6 ${index !== images.length - 1 ? 'mr-10' : ''}`}
                >
                    <Image
                        className={`rounded-2xl p-1 border-8 w-20 h-20 mb-4`}
                        src={image.src}
                        alt={image.desc}
                        width={124}
                        height={124}
                        style={{ borderColor: selectedIndex === index ? 'var(--active-color)' : 'black'}}
                    />
                </div>
            ));
        }
        return null;
    };


    const renderColorCodes = () => {
        if (colorCodes) {
            return colorCodes.map((colorCode, index) => (
                <div
                    onClick={() => handleItemClick(index)}
                    className={`hover:cursor-pointer rounded-2xl border-8 w-20 h-20 mb-6 mr-10 p-0.5`}
                    key={index}
                    style={{ borderColor: selectedIndex === index ? 'var(--active-color)' : 'black'}}
                >
                    <div className="rounded-md w-full h-full" style={{backgroundColor: colorCode}}/>
                </div>
            ));
        }
        return null;
    }

    const renderComponents = () => {
        if (components) {
            return components.map((component, index) => (
                <div
                    key={index}
                    onClick={() => handleItemClick(index)}
                    className={`rounded-2xl p-1 border-8 w-20 h-20 hover:cursor-pointer mb-6 ${index !== components.length - 1 ? 'mr-10' : ''}`}
                    style={{ borderColor: selectedIndex === index ? 'var(--active-color)' : 'black'}}
                >
                    {component}
                </div>
            ));
        }
        return null;
    };


    return (
        <div className="flex flex-wrap">
            {renderImages()}
            {renderColorCodes()}
            {renderComponents()}
        </div>
    );
};

export default SelectItems;
