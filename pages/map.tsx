import React, {useEffect, useRef, useState} from "react";
import "./map.css";
import Layout from "../app/layout";
import {
    getPlanetState, setPlanetState
} from "@/app/utils/storageUtils";
import {getPlanetName, Planets} from "@/app/utils/planetUtils";
import {useRouter} from "next/router";

const MapPage: React.FC = () => {
    const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
    const [planetCompletion, setPlanetCompletion] = useState<{
        [key: string]: boolean;
    }>({});
    const orbitContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
    const [allPlanetsCompleted, setAllPlanetsCompleted] = useState(false);

    useEffect(() => {
        const fetchPlanetCompletion = async () => {
            const completionData = {
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
            await setPlanetState("EARTH",true)
            setPlanetCompletion(completionData);

            // Check if all planets with spaceship parts are completed
            if(completionData["earth"] && completionData["mercury"] && completionData["venus"] && completionData["mars"]){
                setAllPlanetsCompleted(true);
            }
        };

        //fix for screens with smaller height
        if (orbitContainerRef.current) {
            const orbitContainer = orbitContainerRef.current;
            if (window.screen.availHeight <= 950) {
                orbitContainer.style.height = "111vh";
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
                className={` bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto`}>
                {Array.from(planets).map((planet) => (
                    <PlanetDetails
                        planet={planet}
                        key={planet}
                        currentPlanet={selectedPlanet}
                        setCurrentPlanet={setSelectedPlanet}
                        planetCompleted={planetCompletion[planet.toLowerCase()]}
                        disabled={!isEnabled(planet)}
                        videoRefs={videoRefs}
                        allPlanetsCompleted={allPlanetsCompleted}
                    />
                ))}
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
                           allPlanetsCompleted
                       }: {
    planet: Planets;
    currentPlanet: string | null;
    setCurrentPlanet: (planet: string) => void;
    planetCompleted: boolean;
    disabled: boolean,
    videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
    allPlanetsCompleted: boolean
}) {
    const planetRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const planetClick = (planet: string): void => {
        if (allPlanetsCompleted) {
            router.push("/planet-profile?planet=" + planet.toLowerCase())
            return;
        }
        if (disabled) return;
        if (currentPlanet && videoRefs.current[currentPlanet]) {
            videoRefs.current[currentPlanet]?.play();
        }
        setCurrentPlanet(planet);

        if (!planetCompleted) {
            router.push(`/animation-rocket?landing=true&planet=${planet.toLowerCase()}`);
        }
    };

    const handleMouseEnter = (): void => {
        if (disabled) return;
        videoRefs.current[planet]?.pause();
    };

    const handleMouseLeave = (): void => {
        if (disabled) return;
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
                className={`${disabled && !allPlanetsCompleted? "disable" : ""} planet absolute flex flex-col align-middle gap-4 z-50`}
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

export default MapPage;