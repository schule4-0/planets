import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { getPlanetsWithSpaceshipParts, Planets } from '@/app/utils/planetUtils';
import { getPlanetState, setPlanetState } from '@/app/utils/storageUtils';
import ActionButton from "@/app/components/actionButton/ActionButton";
import {useRouter} from "next/router";

interface CollectedSpaceshipPartProps {
    imgSrc: string;
    planet: Planets;
    nextPage: string;
}

const CollectedSpaceshipPart: FC<CollectedSpaceshipPartProps> = ({ imgSrc, planet,nextPage }) => {
    const router = useRouter();
    const [currentParts, setCurrentParts] = useState(0);
    const planetsWithParts = getPlanetsWithSpaceshipParts();
    const totalParts = planetsWithParts.length;

    useEffect(() => {
        updateCurrentParts();
    }, []);

    const updateCurrentParts = async () => {
        await setPlanetState(planet,true)
        let count = 0;
        for (const planet of planetsWithParts) {
            const state = await getPlanetState(planet);
            if (state) {
                count++;
            }
        }
        setCurrentParts(count);
    };

    const handleRouting = () => {
        if (currentParts === totalParts){
            router.push('minigame-spaceship-click');
        }else {
            router.push(nextPage);
        }
    };

    return (
        <div className={"bg-contain bg-no-repeat bg-bottom h-full w-full"}
             style={{backgroundImage: "url(/images/planets/ground/collected_" + planet.toLowerCase() + ".png)"}}>
            <div className={"flex flex-col items-center pt-24 bg-star"}>
                <h1>{currentParts}/{totalParts}</h1>
                <Image src={imgSrc} alt="Raumschiff Teil" width={300} height={300}/>
            </div>
            <ActionButton onClick={handleRouting}/>
        </div>
    );
};

export default CollectedSpaceshipPart;
