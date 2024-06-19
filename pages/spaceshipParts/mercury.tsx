import React, {useState} from 'react';
import Image from 'next/image';
import CollectedSpaceshipPart from "@/app/components/collectedSpaceshipPart/collectedSpaceshipPart";

const CollectMars: React.FC = () => {
    const [collected, setCollected] = useState<boolean>(false);

    const clickPart = () => {
        setCollected(true)
    };

    return (
        <div className="relative page-container bg-star">
            {collected ? (
                <CollectedSpaceshipPart imgSrc={"/images/spaceship/spaceship_middle2.png"} planet={"MERCURY"} nextPage={"/dialog/mercury2"}/>
            ) : (
                <>
            <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full">Finde
                das fehlende Raumschiffteil</h1>
            <div className="absolute bottom-0 left-0 w-full h-[70%]">
                <Image
                    src="/images/planets/ground/collect_mercure.png"
                    alt="collect spaceship"
                    layout="fill"
                    objectFit="fill"
                    className="z-10"
                />
            </div>
            <div
                className="absolute hover:cursor-pointer top-[70%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 w-32 h-20 z-50"
                onClick={clickPart}
                style={{cursor: 'pointer', opacity: 0}}
            />
                </>
            )}
        </div>
    );
};

export default CollectMars;
