import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import {
    getPlanetState, setPlanetState
} from "@/app/utils/storageUtils";
import { getPlanetName, Planets } from "@/app/utils/planetUtils";
import { useRouter } from "next/router";
import ActionButton from "@/app/components/actionButton/ActionButton";

type PlanetCompletion = {
    neptune: boolean;
    uranus: boolean;
    saturn: boolean;
    jupiter: boolean;
    mars: boolean;
    earth: boolean;
    venus: boolean;
    mercury: boolean;
    sun: boolean;
};

interface MapProps {
    showOnly: boolean;
}

const Map: React.FC<MapProps> = ({ showOnly }) => {
    const router = useRouter();
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<PlanetCompletion>({
        neptune: false,
        uranus: false,
        saturn: false,
        jupiter: false,
        mars: false,
        earth: true,
        venus: false,
        mercury: false,
        sun: false,
    });
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const [allEnabledPlanetsCompleted, setAllEnabledPlanetsCompleted] = useState(false);
    const [allPlanetsCompleted, setAllPlanetsCompleted] = useState(false);

    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            const completionData: PlanetCompletion = {
                neptune: (await getPlanetState("NEPTUNE")) !== null,
                uranus: (await getPlanetState("URANUS")) !== null,
                saturn: (await getPlanetState("SATURN")) !== null,
                jupiter: (await getPlanetState("JUPITER")) !== null,
                mars: (await getPlanetState("MARS")) !== null,
                earth: true,
                venus: (await getPlanetState("VENUS")) !== null,
                mercury: (await getPlanetState("MERCURY")) !== null,
                sun: (await getPlanetState("SUN")) !== null,
            };
            await setPlanetState("EARTH", true);
            setPlanetCompletion(completionData);

            const enabledPlanets: (keyof PlanetCompletion)[] = ["earth", "mercury", "venus", "mars"];
            const allEnabledCompleted = enabledPlanets.every(planet => completionData[planet]);
            setAllEnabledPlanetsCompleted(allEnabledCompleted);

            const allPlanets: (keyof PlanetCompletion)[] = ["neptune", "uranus", "saturn", "jupiter", "mars", "earth", "venus", "mercury", "sun"];
            const allCompleted = allPlanets.every(planet => completionData[planet]);
            setAllPlanetsCompleted(allCompleted);
        };

        fetchPlanetCompletion();
    }, [allPlanetsCompleted]);

    useEffect(() => {
        if (selectedPlanet && videoRefs.current[selectedPlanet]) {
            videoRefs.current[selectedPlanet]?.pause();
        }
    }, [selectedPlanet]);

    const isEnabled = (planet: Planets): boolean => {
        let planetsEnabled: Planets[] = ["EARTH"];
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

    const handleRouting = () => {
        router.push('/map/interactive');
    };

    return (
        <div
            className={`bg-star page-container hide-scrollbar relative overflow-hidden ${showOnly ? "show-only" : ""}`}>
            {Array.from(planets).map((planet) => (
                <PlanetDetails
                    planet={planet}
                    key={planet}
                    currentPlanet={selectedPlanet}
                    setCurrentPlanet={setSelectedPlanet}
                    planetCompleted={planetCompletion[planet.toLowerCase() as keyof PlanetCompletion]}
                    disabled={!isEnabled(planet)}
                    videoRefs={videoRefs}
                    allPlanetsCompleted={allEnabledPlanetsCompleted}
                    showOnly={showOnly}
                />
            ))}
            { showOnly && (
                <ActionButton onClick={handleRouting}/>
            )}
            { allPlanetsCompleted && !showOnly && (
                <div className={"fixed bg-black w-full h-full page-container z-40 bg-opacity-50"}>
                    <div className={"absolute w-1/2 h-1/2 top-1/4 left-1/4 rounded-2xl bg-white text-black text-center flex-col flex justify-center z-40"}>
                        <p>Super gemacht!</p>
                        <p>Räume nun das Tablet auf</p>
                    </div>
                </div>
            )}
        </div>
    );
};

function PlanetDetails({
                           planet,
                           currentPlanet,
                           setCurrentPlanet,
                           planetCompleted,
                           disabled,
                           videoRefs,
                           allPlanetsCompleted,
                           showOnly
                       }: {
    planet: Planets;
    currentPlanet: string | null;
    setCurrentPlanet: (planet: string) => void;
    planetCompleted: boolean;
    disabled: boolean,
    videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
    allPlanetsCompleted: boolean,
    showOnly: boolean
}) {
    const planetRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const planetClick = (stringPlanet: string): void => {
        if (showOnly) return;
        if (allPlanetsCompleted) {
            router.push("/planet-profile?planet=" + stringPlanet.toLowerCase())
            setPlanetState(planet, true);
            return;
        }
        if (disabled) return;
        if (currentPlanet && videoRefs.current[currentPlanet]) {
            videoRefs.current[currentPlanet]?.play();
        }
        setCurrentPlanet(stringPlanet);

        if (!planetCompleted) {
            router.push(`/animation-rocket?landing=true&planet=${planet.toLowerCase()}`);
        }
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
                className={`${disabled && !allPlanetsCompleted? "disable" : ""} planet absolute flex flex-col align-middle gap-5 z-40`}
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
                    className={`hover:cursor-pointer planet__name ${currentPlanet === planet ? "planet__name--selected" : ""} ${planetCompleted ? "planet__name--completed" : ""}`}
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

export default Map;