import React, { useState, useRef } from 'react';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import Image from 'next/image';
import './minigame-spaceship.css';
import { useRouter } from "next/router";

const MinigameSpaceshipClick: React.FC = () => {
    const router = useRouter();

    const actionButtonRef = useRef<HTMLInputElement>(null);
    const images = [
        { id: 'Top', src: '/images/raumschiff_top.png', alt: 'Raumschiffteil Oben' },
        { id: 'Middle1', src: '/images/raumschiff_middle1.png', alt: 'Raumschiffteil Mitte1' },
        { id: 'Middle2', src: '/images/raumschiff_middle2.png', alt: 'Raumschiffteil Mitte2' },
        { id: 'Bottom', src: '/images/raumschiff_bottom.png', alt: 'Raumschiffteil Unten' },
    ];
    const imagesRandom = [...images].sort((a, b) => a.src.localeCompare(b.alt));

    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [placedParts, setPlacedParts] = useState<{ [key: string]: boolean }>({
        Top: false,
        Middle1: false,
        Middle2: false,
        Bottom: false,
    });

    const handlePartClick = (id: string) => {
        setSelectedPart(id);
    };

    const handlePlacementAreaClick = (placementAreaId: string) => {
        const partId = placementAreaId.replace('place', '');
        if (selectedPart && selectedPart.replace('select', '') === partId) {
            setPlacedParts(prevState => ({ ...prevState, [partId]: true }));
            setSelectedPart(null);
            if (Object.values(placedParts).filter(Boolean).length + 1 === images.length) {
                actionButtonRef.current?.classList.remove('hidden');
            }
        }
    };

    const renderLeftChildren = () => (
        <div className="h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
            <h2>gesammelte Raumschiffteile</h2>
            {imagesRandom.map(image => (
                !placedParts[image.id] && (
                    <SelectableImage
                        key={"select" + image.id}
                        id={"select" + image.id}
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={100}
                        selected={selectedPart === "select" + image.id}
                        onClick={() => handlePartClick("select" + image.id)}
                    />
                )
            ))}
        </div>
    );

    const renderRightChildren = () => (
        <div>
            <h2>Bau das Raumschiff wieder zusammen...</h2>
            <div className="content-center placement-area flex flex-col items-center">
                {images.map((image, index) => (
                    <PlacementArea
                        key={"place" + image.id}
                        id={"place" + image.id}
                        onClick={() => handlePlacementAreaClick("place" + image.id)}
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={index === 0 ? 107 : (index === images.length - 1 ? 72 : 38)}
                        placed={placedParts[image.id]}
                    />
                ))}
            </div>
        </div>
    );



    const SelectableImage = ({
                                 id,
                                 src,
                                 alt,
                                 width,
                                 height,
                                 selected,
                                 onClick,
                             }: {
        id: string;
        src: string;
        alt: string;
        width: number;
        height: number;
        selected: boolean;
        onClick: () => void;
    }) => (
        <Image
            onClick={onClick}
            alt={alt}
            id={id}
            src={src}
            className={`mt-4 w-full cursor-pointer ${selected ? 'border-4' : '' }`}
            style={{ borderColor: selected ?'var(--active-color)' : '' }}
            width={width}
            height={height}
        />
    );

    const PlacementArea = ({
                               id,
                               src,
                               alt,
                               width,
                               height,
                               placed,
                               onClick,
                           }: {
        id: string;
        src: string;
        alt: string;
        width: number;
        height: number;
        placed: boolean;
        onClick: () => void;
    }) => (
        <div
            id={id}
            className="placement-area w-full flex justify-center items-center"
            onClick={onClick}
            style={{ position: 'relative', cursor: 'pointer', height: `${height}px` }}
        >
            <Image
                draggable="false"
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`absolute`}
                style={{ filter: !placed ?"brightness(0) invert(0.7)" : "" }}

            />
        </div>
    );
    const nextPage = () => {
        router.push('/end');
    };

    return (
        <div className="bg-star">
            <SelectLayout
                leftChildren={renderLeftChildren()}
                rightChildren={renderRightChildren()}
            />
            <div ref={actionButtonRef} className="hidden">
                <ActionButton onClick={nextPage} />
            </div>
        </div>
    );
};

export default MinigameSpaceshipClick;
