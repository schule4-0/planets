'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {getCharacterName} from "@/app/utils/storageUtils";

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchCharacterName = async () => {
            try {
                const characterName = await getCharacterName();
                if (characterName !== null && characterName !== "") {
                    router.push('/map/interactive');
                } else {
                    router.push('/');
                }
            } catch (error) {
                router.push('/');
            }
        };
        fetchCharacterName();
    }, []);

    return (
        <html>
            <head>
                <title>Weiterleitung...</title>
            </head>
            <body>
                <div className={"w-full bg-star h-screen"}></div>
            </body>
        </html>
    );
};

export default NotFound;