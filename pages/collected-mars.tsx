import React from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import ActionButton from "@/app/components/actionButton/ActionButton";

const CollectedMars: React.FC = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/collectmars');
    };

    return (
        <div className="relative page-container bg-star">
            <div className="absolute bottom-0 top--2 left-0 w-full h-[110%]">
                <Image
                    src="/images/planets/ground/collected_mars.png"
                    alt="collect spaceship"
                    layout="fill"
                    objectFit="fill"
                    className="z-10"
                />
            </div>
            <ActionButton onClick={nextPage}></ActionButton>
        </div>
    );
};

export default CollectedMars;
