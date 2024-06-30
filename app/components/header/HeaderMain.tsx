import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/router";

const HeaderMain: React.FC = () => {
    const router = useRouter();
    function openDictionary(){
         router.push(router.pathname + "?dictionary");
    }

    return (
        <header className="flex justify-between items-center px-7 text-white" style={{ background: 'linear-gradient(to right, #040758, #4F0080)'}}>
            <div className={"flex items-center"}>
                <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mr-3" style={{height: "50px", width: "auto"}} />
                <h1>Planeten Entdecker</h1>
            </div>
            <Image onClick={openDictionary} className={"cursor-pointer"} src={"/images/dictionary.svg"} alt={"Wörterbuch"} width={60} height={60} style={{height: "60px", width: "auto"}} />
        </header>
    );
}

export default HeaderMain;
