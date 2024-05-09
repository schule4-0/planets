import React from 'react';
import Image from "next/image";

interface ImageItem {
    src: string;
    alt: string;
}

interface selectItemsProps {
    images?: ImageItem[];
    colorCodes?: string[];
    onClick: (index: number) => void;
}

const SelectItems: React.FC<selectItemsProps> = ({images, colorCodes, onClick}) => {

    const renderImages = () => {
        if (images) {
            return images.map((image, index) => (
                <Image
                    onClick={() => onClick(index)}
                    className={"hover:cursor-pointer rounded-2xl border-black border-8 w-32 h-32 mb-2 " + (index !== images.length - 1 ? "mr-28" : "")}
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={124}
                    height={124}
                />
            ));
        }
        return null;
    }

    const renderColorCodes = () => {
        if (colorCodes) {
            return colorCodes.map((colorCode, index) => (
                <div
                    onClick={() => onClick(index)}
                    className={"hover:cursor-pointer rounded-2xl border-black border-8 w-24 h-24 mb-2 p-0.5 " + (index !== colorCodes.length - 1 ? "mr-10" : "")}
                    key={index}
                >
                    <div className="rounded-md w-full h-full" style={{backgroundColor: colorCode}}/>
                </div>
            ));
        }
        return null;
    }

    return (
        <div className={"flex justify-start w-full flex-wrap"}>
            {renderImages()}
            {renderColorCodes()}
        </div>
    );
};

export default SelectItems;