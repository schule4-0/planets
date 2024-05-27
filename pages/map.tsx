import React, {useEffect, useRef, useState} from 'react';
import './map.css';
import Layout from '../app/layout';
import {
    getNeptune, getUranus, getSaturn, getJupiter, getMars,
    getEarth, getVenus, getMercury, getSun
} from '@/app/utils/storageUtils';

const MapPage: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<{ [key: string]: boolean }>({});
    const orbitContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            const completionData = {
                Neptune: (await getNeptune()) !== null,
                Uranus: (await getUranus()) !== null,
                Saturn: (await getSaturn()) !== null,
                Jupiter: (await getJupiter()) !== null,
                Mars: (await getMars()) !== null,
                Earth: (await getEarth()) !== null,
                Venus: (await getVenus()) !== null,
                Mercury: (await getMercury()) !== null,
                Sun: (await getSun()) !== null
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

    const planetClick = (planet: string): void => {
        if (selectedPlanet !== null && selectedPlanet !== planet) {
            let planetVideo: HTMLVideoElement = window.document.getElementById(selectedPlanet) as HTMLVideoElement;

            planetVideo?.play();
        }
        setSelectedPlanet(planet);
    }

    const handleMouseEnter = (planet: string): void => {
        let planetVideo: HTMLVideoElement = window.document.getElementById(planet) as HTMLVideoElement;
        planetVideo.pause();
    }

    const handleMouseLeave = (planet: string): void => {
        if (selectedPlanet !== planet) {
            let planetVideo: HTMLVideoElement = window.document.getElementById(planet) as HTMLVideoElement;
            planetVideo.play();
        }
    }

    const getVideoSource = (planet: string): string => {
        return `/images/planets/${planet.toLowerCase()}.webm`;
    }

    return (
        <Layout>
            <div ref={orbitContainerRef}
                 className="bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto">
                {['Neptun', 'Uranus', 'Saturn', 'Jupiter', 'Mars', 'Erde', 'Venus', 'Merkur'].map((planet) => (
                    <div className={`orbit absolute rounded-full orbit--${planet.toLowerCase()}`} key={planet}>
                        <div className="planet absolute flex flex-col align-middle gap-4 z-50">
                            <video
                                id={planet}
                                className={"hover:cursor-pointer"}
                                autoPlay
                                loop
                                muted
                                src={getVideoSource(planet)}
                                width={100}
                                height={100}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={() => handleMouseLeave(planet)}
                            />
                            <div
                                className={`hover:cursor-pointer planet__name ${selectedPlanet === planet ? 'planet__name--selected' : ''} ${planetCompletion[planet] ? 'planet__name--completed' : ''}`}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={() => handleMouseLeave(planet)}
                            >
                                {planet}
                            </div>
                        </div>
                    </div>
                ))}
                <div className={"planet"}>
                    <video
                        id={"Sun"}
                        className="planet--sun max-w-none absolute -left-96 hover:cursor-pointer"
                        autoPlay
                        loop
                        muted
                        src={getVideoSource('Sun')}
                        width={650}
                        height={650}
                        onClick={() => planetClick('Sun')}
                        onMouseEnter={() => handleMouseEnter('Sun')}
                        onMouseLeave={() => handleMouseLeave('Sun')}
                    />
                    <div
                        className={`planet__name--sun left-4 !absolute planet__name ${selectedPlanet === 'Sun' ? 'planet__name--selected' : ''} ${planetCompletion.Sun ? 'planet__name--completed' : ''}`}
                        onClick={() => planetClick('Sun')}
                        onMouseEnter={() => handleMouseEnter('Sun')}
                        onMouseLeave={() => handleMouseLeave('Sun')}
                    >
                        Sonne
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MapPage;
