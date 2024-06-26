import React, {useState} from 'react';
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
                    <div className="w-full h-full bg-contain bg-bottom bg-no-repeat"
                         style={{backgroundImage: "url(/images/planets/ground/collect_mercury.png)"}}>
                        <h1 className="text-center text-white w-full pt-4">Finde
                            das fehlende Raumschiffteil</h1>
                        <div
                            className="absolute hover:cursor-pointer top-[76%] left-[3%] w-32 h-20 z-50"
                            onClick={clickPart}
                            style={{cursor: 'pointer', opacity: 0}}
                        />
                    </div>
            )}
        </div>
    );
};

export default CollectMars;
