import React, {useEffect, useRef, useState} from "react";
import "./map.css";
import Layout from "../app/layout";
import {
    getPlanetState
} from "@/app/utils/storageUtils";
import {getPlanetName, Planets} from "@/app/utils/planetUtils";
import ActionButton from "@/app/components/actionButton/ActionButton";
import {router} from "next/client";

const MapPage: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<{
        [key: string]: boolean;
    }>({});
    const orbitContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const [showOnly, setShowOnly] = useState(false);
    const [allPlanetsCompleted, setAllPlanetsCompleted] = useState(false);


    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            const completionData = {
                neptune: (await getPlanetState("NEPTUNE")) !== null,
                uranus: (await getPlanetState("URANUS")) !== null,
                saturn: (await getPlanetState("SATURN")) !== null,
                jupiter: (await getPlanetState("JUPITER")) !== null,
                mars: (await getPlanetState("MARS")) !== null,
                earth: (await getPlanetState("EARTH")) !== null,
                venus: (await getPlanetState("VENUS")) !== null,
                mercury: (await getPlanetState("MERCURY")) !== null,
                sun: (await getPlanetState("SUN")) !== null,
            };

            // Check if all planets should show without function
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('show-only')) {
                setShowOnly(true);
                let path = urlParams.get('next-route')
            }
            setPlanetCompletion(completionData);

            // Check if all planets are completed
            const allCompleted = Object.values(completionData).every(Boolean);
            setAllPlanetsCompleted(allCompleted);
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
        if (selectedPlanet && videoRefs.current[selectedPlanet]) {
            videoRefs.current[selectedPlanet]?.pause();
        }
    }, [selectedPlanet]);

    const isEnabled = (planet: Planets): boolean => {
        let planetsEnabled: Planets[] = ["EARTH"];
        // Enable other rock planets if earth completed
        if (planetCompletion["earth"]) {
            planetsEnabled.push("MERCURY", "VENUS", "MARS");
        }
        return planetsEnabled.includes(planet)
    };

    const planets: Set<Planets> = new Set<Planets>([
        "SUN",
        "MERCURY",
        "VENUS",
        "EARTH",
        "MARS",
        "JUPITER",
        "SATURN",
        "URANUS",
        "NEPTUNE"
    ]);

    return (
        <Layout>
            <div
                ref={orbitContainerRef}
                className={`${showOnly? "show-only": ""} bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto`}>
                {Array.from(planets).map((planet) => (
                    <PlanetDetails
                        planet={planet}
                        key={planet}
                        currentPlanet={selectedPlanet}
                        setCurrentPlanet={setSelectedPlanet}
                        planetCompleted={planetCompletion[planet.toLowerCase()]}
                        disabled={!isEnabled(planet)}
                        videoRefs={videoRefs}
                        showOnly={showOnly}
                        allPlanetsCompleted={allPlanetsCompleted}
                    />
                ))}
                {showOnly &&
                        <ActionButton onClick={() =>{router.push('/dialog2') }}/>
                }
            </div>
        </Layout>
    );
};

function PlanetDetails({
                           planet,
                           currentPlanet,
                           setCurrentPlanet,
                           planetCompleted,
                           disabled,
                           videoRefs,
                           showOnly,
                           allPlanetsCompleted
                       }: {
    planet: Planets;
    currentPlanet: string | null;
    setCurrentPlanet: (planet: string) => void;
    planetCompleted: boolean;
    disabled: boolean,
    videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
    showOnly: boolean,
    allPlanetsCompleted: boolean
}) {
    const planetRef = useRef<HTMLDivElement>(null);

    const planetClick = (planet: string): void => {
        if (allPlanetsCompleted){
            window.location.href = "/planet-profile?planet=" + planet.toLowerCase();
            return;
        }
        if (disabled || showOnly) return;
        if (currentPlanet && videoRefs.current[currentPlanet]) {
            videoRefs.current[currentPlanet]?.play();
        }
        setCurrentPlanet(planet);
    };

    const handleMouseEnter = (): void => {
        if (disabled || showOnly) return;
        videoRefs.current[planet]?.pause();
    };

    const handleMouseLeave = (): void => {
        if (disabled || showOnly) return;
        if (currentPlanet !== planet) {
            videoRefs.current[planet]?.play();
        }
    };

    const getVideoSource = (planet: string): { [key: string]: string } => {
        return {
            "mp4": `/images/planets/${planet.toLowerCase()}.mp4`,
            "webm": `/images/planets/${planet.toLowerCase()}.webm`
        };
    };

    return (
        <div className={`orbit absolute rounded-full orbit--${planet.toLowerCase()}`}>
            <div
                className={`${disabled && !showOnly ? "disable" : ""} planet absolute flex flex-col align-middle gap-4 z-50`}
                ref={planetRef}
            >
                <video
                    ref={(el) => {
                        if (el) videoRefs.current[planet] = el;
                    }}
                    id={planet}
                    className={"hover:cursor-pointer"}
                    autoPlay
                    loop
                    muted
                    width={100}
                    height={100}
                    onClick={() => planetClick(planet)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {Object.entries(getVideoSource(planet)).map(([type, src]) => (
                        <source key={type} src={src} type={`video/${type}`}/>
                    ))}
                </video>
                <div
                    className={`hover:cursor-pointer planet__name ${currentPlanet === planet ? "planet__name--selected" : ""} ${planetCompleted && !showOnly ? "planet__name--completed" : ""}`}
                    onClick={() => planetClick(planet)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {getPlanetName(planet)}
                </div>
            </div>
        </div>
    );
}

export default MapPage;