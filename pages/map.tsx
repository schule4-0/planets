import React, {useEffect, useRef, useState} from 'react';
import './map.css';
import Layout from '../app/layout';
import Image from "next/image";
import {
    getNeptune, getUranus, getSaturn, getJupiter, getMars,
    getEarth, getVenus, getMercury, getSun
} from '@/app/utils/storageUtils';
import {getPlanetName} from '@/app/utils/planetUtils';

const MapPage: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<{ [key: string]: boolean }>({});
    const orbitContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            const completionData = {
                neptune: (await getNeptune()) !== null,
                uranus: (await getUranus()) !== null,
                saturn: (await getSaturn()) !== null,
                jupiter: (await getJupiter()) !== null,
                mars: (await getMars()) !== null,
                earth: (await getEarth()) !== null,
                venus: (await getVenus()) !== null,
                mercury: (await getMercury()) !== null,
                sun: (await getSun()) !== null
            };
            setPlanetCompletion(completionData);
        };

        //fix for screens with smaller height
        if (orbitContainerRef.current) {
            const orbitContainer = orbitContainerRef.current;
            if (window.screen.availHeight <= 950) {
                orbitContainer.style.height = "170vh";
            }
        }

        fetchPlanetCompletion();
    }, []);

    useEffect(() => {
        if (Object.keys(planetCompletion).length > 0) {
            enablePlanet(planetCompletion);
        }
    }, [planetCompletion]);

    const enablePlanet = (completionData: { [key: string]: boolean }): void => {
        let planetsName: string[] = ["earth"];
        // Enable other rock planets if earth completed
        if (completionData["earth"]) {
            planetsName.push("mercury", "venus", "mars");
        }
        planetsName.forEach((name) => {
            let planetName = window.document.getElementById(name + "-planet");
            if (planetName) {
                planetName.classList.remove("disable");
            }
        });
    };

    const isDisabled = (planet: string): boolean => {
        let planetName = window.document.getElementById(planet.toLowerCase() + "-planet");
        if (planetName) {
            return planetName.classList.contains("disable");
        }
        return true;
    }

    const planetClick = (planet: string): void => {
        if (isDisabled(planet)) return;
        setSelectedPlanet(planet);
    }

    const handleMouseEnter = (planet: string): void => {
        if (isDisabled(planet)) return;
        setHoveredPlanet(planet);
    }

    const handleMouseLeave = (planet: string): void => {
        if (isDisabled(planet)) return;
        setHoveredPlanet(null);
    }

    const getImageSrc = (planet: string, isHovered: boolean, isSelected: boolean): string => {
        return (isHovered || isSelected) ? `/images/planets/${planet}.gif` : `/images/planets/${planet}.png`;
    }

    return (
        <Layout>
            <div ref={orbitContainerRef}
                 className="bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto">
                {['neptune', 'uranus', 'saturn', 'jupiter', 'mars', 'earth', 'venus', 'mercury'].map((planet) => (
                    <div className={`orbit absolute rounded-full orbit--${planet}`} key={planet}>
                        <div className="disable planet absolute flex flex-col align-middle gap-4 z-50"
                             id={`${planet}-planet`}>
                            <Image
                                /* We use unoptimized because the optimized version causes problems for gifs */
                                unoptimized={true}
                                className={"hover:cursor-pointer"}
                                src={getImageSrc(planet, hoveredPlanet === planet, selectedPlanet === planet)}
                                alt={planet}
                                width={100}
                                height={100}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={() => handleMouseLeave(planet)}
                            />
                            <div
                                className={`disable hover:cursor-pointer planet__name ${selectedPlanet === planet ? 'planet__name--selected' : ''} ${planetCompletion[planet] ? 'planet__name--completed' : ''}`}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={() => handleMouseLeave(planet)}
                            >
                                {getPlanetName(planet)}
                            </div>
                        </div>
                    </div>
                ))}
                <div className={"disable planet"} id={"sun-planet"}>
                    <Image
                        /* We use unoptimized because the optimized version causes problems for gifs */
                        unoptimized={true}
                        className="planet--sun  max-w-none absolute -left-56 hover:cursor-pointer"
                        src={getImageSrc('sun', hoveredPlanet === 'sun', selectedPlanet === 'sun')}
                        alt="Sonne"
                        width={450}
                        height={450}
                        onClick={() => planetClick('sun')}
                        onMouseEnter={() => handleMouseEnter('sun')}
                        onMouseLeave={() => handleMouseLeave('sun')}
                    />
                    <div
                        id={"sun-name"}
                        className={`planet__name--sun left-4 !absolute planet__name ${selectedPlanet === 'Sun' ? 'planet__name--selected' : ''} ${planetCompletion.Sun ? 'planet__name--completed' : ''}`}
                        onClick={() => planetClick('sun')}
                        onMouseEnter={() => handleMouseEnter('sun')}
                        onMouseLeave={() => handleMouseLeave('sun')}
                    >
                        {getPlanetName("sun")}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MapPage;
