import React, {useState, useEffect, useRef} from 'react';
import './map.css';
import Layout from '../app/layout';
import Image from "next/image";

const MapPage: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<{ [key: string]: boolean }>({});
    const orbitContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            //@todo Replace with actual data
            const completionData = {
                Neptune: true,
                Uranus: false,
                Saturn: false,
                Jupiter: true,
                Mars: true,
                Earth: false,
                Venus: true,
                Mercury: false,
                Sun: true
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
        setSelectedPlanet(planet);
    }

    const handleMouseEnter = (planet: string): void => {
        setHoveredPlanet(planet);
    }

    const handleMouseLeave = (): void => {
        setHoveredPlanet(null);
    }

    const getImageSrc = (planet: string, isHovered: boolean, isSelected: boolean): string => {
        return (isHovered || isSelected) ? `/images/planets/${planet.toLowerCase()}.gif` : `/images/planets/${planet.toLowerCase()}.png`;
    }

    return (
        <Layout>
            <div className={"hide-scrollbar overflow-auto"}>
            <div ref={orbitContainerRef} className="bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto">
                {['Neptune', 'Uranus', 'Saturn', 'Jupiter', 'Mars', 'Erde', 'Venus', 'Merkur'].map((planet) => (
                    <div className={`orbit orbit--${planet.toLowerCase()}`} key={planet}>
                        <div className="planet">
                            <Image
                                /* We use unoptimized because the optimized version causes problems for gifs */
                                unoptimized={true}
                                src={getImageSrc(planet, hoveredPlanet === planet, selectedPlanet === planet)}
                                alt={planet}
                                width={100}
                                height={100}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={handleMouseLeave}
                            />
                            <div
                                className={`planet__name ${selectedPlanet === planet ? 'planet__name--selected' : ''} ${planetCompletion[planet] ? 'planet__name--completed' : ''}`}
                                onClick={() => planetClick(planet)}
                                onMouseEnter={() => handleMouseEnter(planet)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {planet}
                            </div>
                        </div>
                    </div>
                ))}
                <div className={"planet"}>
                    <Image
                        priority={true}
                        className="planet--sun absolute -left-60 hover:cursor-pointer"
                        src={getImageSrc('Sun', hoveredPlanet === 'Sun', selectedPlanet === 'Sun')}
                        alt="Sonne"
                        width={450}
                        height={450}
                        onClick={() => planetClick('Sun')}
                        onMouseEnter={() => handleMouseEnter('Sun')}
                        onMouseLeave={handleMouseLeave}
                    />
                    <div
                        className={`planet__name--sun planet__name ${selectedPlanet === 'Sun' ? 'planet__name--selected' : ''} ${planetCompletion.Sun ? 'planet__name--completed' : ''}`}
                        onClick={() => planetClick('Sun')}
                    >
                        Sonne
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default MapPage;
