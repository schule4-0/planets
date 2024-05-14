import React from 'react';
import Image from 'next/image';  

const HeaderMain: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 text-white relative bg-cover" style={{ backgroundImage: 'url(/images/headerbg.svg)' }}>
            <div className="flex items-center">
                <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
                <div className="text-2xl font-bold" style={{ fontFamily: 'Agency FB' }}>
                    Planeten Entdecker
                </div>
            </div>
        </header>
    );
}

export default HeaderMain;
