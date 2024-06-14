import React, { useRef } from 'react';
import SelectLayout from '@/app/selectLayout';
import ActionButton from '@/app/components/actionButton/ActionButton';
import Image from 'next/image';
import './minigame-spaceship.css';

const MiniGameSpaceship: React.FC = () => {
    const dropRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});
    const actionButtonRef = useRef<HTMLDivElement>(null);
    const images = [
        { id: 'Top', src: '/images/raumschiff_top.png', alt: 'Raumschiffteil Oben' },
        { id: 'Middle1', src: '/images/raumschiff_middle1.png', alt: 'Raumschiffteil Mitte 1' },
        { id: 'Middle2', src: '/images/raumschiff_middle2.png', alt: 'Raumschiffteil Mitte 2' },
        { id: 'Bottom', src: '/images/raumschiff_bottom.png', alt: 'Raumschiffteil Unten' },
    ];

    const imagesRandom = [...images].sort((a, b) => a.src.localeCompare(b.src));

    let moving: HTMLElement | null = null;
    let clone: HTMLElement | null = null;
    let allDropped = 0;

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const drag = (event: React.DragEvent<HTMLImageElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
    };

    const drop = (dropZoneId: string) => {
        const draggedElementId = moving?.id;
        const dropZoneElement = document.getElementById(dropZoneId);

        if (moving && dropZoneElement && draggedElementId === dropZoneId.replace('drop', 'drag')) {
            dropZoneElement.style.filter = 'none';
            moving.style.visibility = 'hidden';
            if (++allDropped === images.length) {
                actionButtonRef.current?.classList.remove('hidden');
            }
        }
    };

    const pickup = (event: React.MouseEvent | React.TouchEvent) => {
        const target = event.currentTarget as HTMLElement;
        moving = target;
        clone = target.cloneNode(true) as HTMLElement;
        clone.style.position = 'fixed';
        clone.style.pointerEvents = 'none';
        clone.style.zIndex = '1000';
        clone.style.width = `${target.clientWidth}px`;
        document.body.appendChild(clone);
        target.style.visibility = 'hidden';
        move(event);
    };

    const move = (event: React.MouseEvent | MouseEvent | React.TouchEvent) => {
        if (clone) {
            const clientX = 'clientX' in event ? event.clientX : event.changedTouches[0].clientX;
            const clientY = 'clientY' in event ? event.clientY : event.changedTouches[0].clientY;
            clone.style.left = `${clientX - clone.clientWidth / 2}px`;
            clone.style.top = `${clientY - clone.clientHeight / 2 - 10}px`;
        }
    };

    const dropMovement = () => {
        if (clone && moving) {
            let droppedSuccessful = false;
            Object.keys(dropRefs.current).forEach((dropZoneId) => {
                const dropZoneElement = document.getElementById(dropZoneId);
                if (dropZoneElement && clone) {
                    const rect = dropZoneElement.getBoundingClientRect();
                    const x = clone.getBoundingClientRect().left + clone.clientWidth / 2;
                    const y = clone.getBoundingClientRect().top + clone.clientHeight / 2;
                    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        if (moving?.id === dropZoneId.replace('drop', 'drag')) {
                            droppedSuccessful = true;
                            drop(dropZoneId);
                        }
                    }
                }
            });
            document.body.removeChild(clone);
            clone = null;
            if (!droppedSuccessful && moving) {
                moving.style.visibility = 'visible';
            }
            moving = null;
        }
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        pickup(event);
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        dropMovement();
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const renderLeftChildren = () => (
        <>
            <div className="h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
                <h2>Gesammelte Raumschiffteile</h2>
                {imagesRandom.map((image) => (
                    <DraggableImage
                        key={'drag' + image.id}
                        id={'drag' + image.id}
                        src={image.src}
                        alt={image.alt}
                        width={300}
                        height={100}
                        onMouseDown={handleMouseDown}
                        onTouchStart={pickup}
                        onTouchMove={move}
                        onTouchEnd={dropMovement}
                        onDragStart={drag}
                    />
                ))}
            </div>
        </>
    );

    const renderRightChildren = () => (
        <>
            <h2>Baue das Raumschiff wieder zusammen...</h2>
            <div className={'content-center drop-zone'}>
                {images.map((image) => (
                    <DropZoneImage
                        key={'drop' + image.id}
                        id={'drop' + image.id}
                        dropRefs={dropRefs}
                        onDragOver={allowDrop}
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={300}
                    />
                ))}
            </div>
        </>
    );

    return (
        <div className="bg-star">
            <SelectLayout leftChildren={renderLeftChildren()} rightChildren={renderRightChildren()} />
            <div ref={actionButtonRef} className={'hidden'}>
                <ActionButton onClick={() => console.log('Action button clicked')} />
            </div>
        </div>
    );
};

interface DraggableImageProps {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    onMouseDown: (event: React.MouseEvent) => void;
    onTouchStart: (event: React.TouchEvent) => void;
    onTouchMove: (event: React.TouchEvent) => void;
    onTouchEnd: (event: React.TouchEvent) => void;
    onDragStart: (event: React.DragEvent<HTMLImageElement>) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
                                                           id,
                                                           src,
                                                           alt,
                                                           width,
                                                           height,
                                                           onMouseDown,
                                                           onTouchStart,
                                                           onTouchMove,
                                                           onTouchEnd,
                                                           onDragStart,
                                                       }) => (
    <Image
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        alt={alt}
        id={id}
        src={src}
        draggable="true"
        onDragStart={onDragStart}
        className="mt-4 w-full cursor-grab"
        width={width}
        height={height}
    />
);

interface DropZoneImageProps {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    dropRefs: React.MutableRefObject<{ [key: string]: HTMLImageElement | null }>;
    onDragOver: (event: React.DragEvent<HTMLImageElement>) => void;
}

const DropZoneImage: React.FC<DropZoneImageProps> = ({
                                                         id,
                                                         src,
                                                         alt,
                                                         width,
                                                         height,
                                                         dropRefs,
                                                         onDragOver,
                                                     }) => (
    <Image
        draggable="false"
        id={id}
        ref={(el) => {
            if (el) dropRefs.current[id] = el;
        }}
        className="w-full"
        onDrop={(e) => e.preventDefault()}
        onDragOver={onDragOver}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ filter: 'brightness(0) invert(0.7)' }}
    />
);

export default MiniGameSpaceship;
