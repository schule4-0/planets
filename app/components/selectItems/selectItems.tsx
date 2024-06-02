import React from 'react';
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
}

const SelectItems: React.FC<SelectItemsProps> = ({ images, colorCodes, components, onClick }) => {

    const renderImages = () => {
        if (images) {
            return images.map((image, index) => (
                <div key={index} onClick={() => onClick(index)}
                     className={"hover:cursor-pointer mb-6 mr-10"}>
                    <Image
                        className={"rounded-2xl p-1 border-black border-8 w-32 h-32 mb-4"}
                        src={image.src}
                        alt={image.desc}
                        width={124}
                        height={124}
                    />
                </div>
            ));
        }
        return null;
    }

    const renderColorCodes = () => {
        if (colorCodes) {
            return colorCodes.map((colorCode, index) => (
                <div
                    onClick={() => onClick(index)}
                    className={"hover:cursor-pointer rounded-2xl border-black border-8 w-24 h-24 mb-6 mr-10 p-0.5 "}
                    key={index}
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
                <div key={index} onClick={() => onClick(index)}
                     className={"rounded-2xl p-1 border-black border-8 w-32 h-32 hover:cursor-pointer mb-6 mr-10 "}>
                    {component}
                </div>
            ));
        }
        return null;
    }

    return (
        <div className="flex flex-wrap">
            {renderImages()}
            {renderColorCodes()}
            {renderComponents()}
        </div>
    );
};

export default SelectItems;
