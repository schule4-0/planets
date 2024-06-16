import { useRouter } from "next/router";
import { useEffect } from "react";
import {getCharacterName} from "@/app/utils/storageUtils";

export default function Home() {
    const router = useRouter();
    const characterName = getCharacterName()

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
}
