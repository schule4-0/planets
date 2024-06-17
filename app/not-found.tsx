'use client'; // Add this line

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
                    router.push('/map');
                } else {
                    router.push('/startpage');
                }
            } catch (error) {
                router.push('/startpage');
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
                <div className={"w-full bg-star"} style={{height: "100vh"}}></div>
            </body>
        </html>
    );
};

export default NotFound;