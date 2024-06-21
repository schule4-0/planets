import React, {useState} from 'react';
import Image from 'next/image';
import SpeechBubble from "@/app/components/speechBubble/speechBubble";
import CollectedSpaceshipPart from "@/app/components/collectedSpaceshipPart/collectedSpaceshipPart";

const Mars: React.FC = () => {
    const [collected, setCollected] = useState<boolean>(false);

    const clickPart = () => {
        setCollected(true)
    };

    return (
        <div className="relative page-container bg-star">
            {collected ? (
                    <CollectedSpaceshipPart imgSrc={"/images/spaceship/spaceship_bottom.png"} planet={"MARS"} nextPage={"/map"}/>
            ) : (
                <>
                    <div className="absolute bottom-0 right-72 top-40">
                        <SpeechBubble text={"Schau!"} direction={"right"} />
                    </div>
                    <div className="absolute bottom-0 top--2 left-0 w-full h-[70%]">
                        <Image
                            src="/images/planets/ground/collect_mars.png"
                            alt="collect spaceship"
                            layout="fill"
                            objectFit="fill"
                            className="z-10"
                        />
                    </div>
                    <div
                        className="relative hover:cursor-pointer top-[65%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-40 z-50"
                        onClick={clickPart}
                        style={{ cursor: 'pointer', opacity: 0 }}
                    />
                </>
            )}
        </div>
    );
};

export default Mars;
