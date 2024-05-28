import React from 'react';
import Image from 'next/image'; 

const HeaderSubpage: React.FC = () => {
    return (
        <header className="flex justify-between items-center bg-header p-4 text-white">
            <div className="flex items-center">
                <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
                <div className="text-lg max-w-28">
                    Planeten Entdecker
                </div>
            </div>
            <nav className="flex items-center">
                <a href="#" className="flex items-center mr-5 text-white no-underline hover:underline text-lg">
                    Aufgaben
                    <Image src="/images/aufgaben.png" alt="Aufgaben" width={30} height={30} className="ml-1 mr-1"/>
                </a>
                <a href="#" className="flex items-center text-white no-underline hover:underline text-lg">
                    Spiele
                    <Image src="/images/spiele.png" alt="Spiele" width={30} height={30} className="ml-1 mr-1"/>
                </a>
                <div className="flex items-center justify-center">
                    <Image src="/images/hamburger-menu.png" alt="Menü" width={100} height={100} className="cursor-pointer ml-10"/>
                </div>
            </nav>
        </header>
    );
}

export default HeaderSubpage;

