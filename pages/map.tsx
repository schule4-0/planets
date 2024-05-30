import React, { useEffect, useRef, useState } from "react";
import "./map.css";
import Layout from "../app/layout";
import {
  getNeptune,
  getUranus,
  getSaturn,
  getJupiter,
  getMars,
  getEarth,
  getVenus,
  getMercury,
  getSun,
} from "@/app/utils/storageUtils";
import { getPlanetName } from "@/app/utils/planetUtils";

export type Planets =
  | "EARTH"
  | "NEPTUE"
  | "URANUS"
  | "SATURN"
  | "JUPITER"
  | "MARS"
  | "VENUS"
  | "MERCURY"
  | "SUN";

const MapPage: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [planetCompletion, setPlanetCompletion] = useState<{
    [key: string]: boolean;
  }>({});
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
        sun: (await getSun()) !== null,
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

  return (
    <Layout>
      <div
        ref={orbitContainerRef}
        className="bg-star h-screen hide-scrollbar relative overflow-y-hidden overflow-x-auto"
      >
        {[
          "neptune",
          "uranus",
          "saturn",
          "jupiter",
          "mars",
          "earth",
          "venus",
          "mercury",
        ].map((planet) => (
          <PlanetDetails
            planet={planet}
            key={planet}
            currentPlanet={selectedPlanet}
            setCurrentPlanet={setSelectedPlanet}
            planetCompleted={planetCompletion[planet]}
          />
        ))}
        <PlanetDetails
          planet="sun"
          currentPlanet={selectedPlanet}
          setCurrentPlanet={setSelectedPlanet}
          planetCompleted={false}
        />
      </div>
    </Layout>
  );
};

function PlanetDetails({
  planet,
  currentPlanet,
  setCurrentPlanet,
  planetCompleted,
}: {
  planet: string;
  currentPlanet: string | null;
  setCurrentPlanet: (planet: string) => void;
  planetCompleted: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);

  const isDisabled = (): boolean => {
    return planetRef.current?.classList.contains("disable") ?? false;
  };

  const planetClick = (planet: string): void => {
    if (isDisabled()) return;
    videoRef.current?.play();
    setCurrentPlanet(planet);
  };

  const handleMouseEnter = (planet: string): void => {
    if (isDisabled()) return;
    videoRef.current?.pause();
  };

  const handleMouseLeave = (planet: string): void => {
    if (isDisabled()) return;
    if (currentPlanet !== planet) {
      videoRef.current?.play();
    }
  };

  const getVideoSource = (planet: string): string => {
    return `/images/planets/${planet.toLowerCase()}.webm`;
  };

  return (
    <div className={`orbit absolute rounded-full orbit--${planet}`}>
      <div
        className="disable planet absolute flex flex-col align-middle gap-4 z-50"
        ref={planetRef}
        id={`${planet}-planet`}
      >
        <video
          ref={videoRef}
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
          className={`disable hover:cursor-pointer planet__name ${currentPlanet === planet ? "planet__name--selected" : ""} ${planetCompleted ? "planet__name--completed" : ""}`}
          onClick={() => planetClick(planet)}
          onMouseEnter={() => handleMouseEnter(planet)}
          onMouseLeave={() => handleMouseLeave(planet)}
        >
          {getPlanetName(planet)}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
