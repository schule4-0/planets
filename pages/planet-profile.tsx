import Layout from '../app/layout';
import React from "react";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import ActionButton from "@/app/components/actionButton/ActionButton";
import { useRouter } from "next/router";
import planetData from "@/public/json/planet-profile.json";

type PlanetKey = keyof typeof planetData;

const PlanetProfile: React.FC = () => {
    const searchParams = useSearchParams();
    const planet = searchParams ? searchParams.get('planet') : "earth";
    const planetKey = (planet ?? "earth") as PlanetKey;
    const router = useRouter();

    const handleRouting = () => {
        router.push('/map');
    };

    function getImagePath(planet: PlanetKey): string {
        return `/images/planets/${planet.toLowerCase()}.png`;
    }

    return (
        <Layout>
            <div className="page-container bg-star relative flex items-center justify-end">
                <Image className={"h-full w-auto absolute left-4"} src={getImagePath(planetKey)} alt="planet" width={800} height={800} />
                <div className={"bg-white p-6 overflow-y-auto rounded-2xl max-w-xl w-fit text-black z-10 h-5/6 mr-24"}>
                    <h1 className={"mb-6"}>{planetData[planetKey]?.header}</h1>
                    {planetData[planetKey] && Object.entries(planetData[planetKey].info).map(([key, value]) => (
                        <div key={key} className={"pb-6 subtitles"}>
                            <p><strong>{key}</strong>: {value}</p>
                        </div>
                    ))}
                </div>
                <ActionButton onClick={handleRouting}/>
            </div>
        </Layout>
    );
}

export default PlanetProfile;
