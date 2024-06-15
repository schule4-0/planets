import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    //placeholder if we have a start screen
    useEffect(() => {
        router.push('/startpage');
    }, []);
}
