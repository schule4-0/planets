import React from 'react';
import Image from 'next/image';

const HeaderMain: React.FC = () => {
    return (
        <header className="flex justify-start items-center p-4 text-white relative bg-cover text-2xl font-bold" style={{ backgroundImage: 'url(/images/headerbg.svg)', fontFamily: 'Agency FB' }}>
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
            Planeten Entdecker
        </header>
    );
}

export default HeaderMain;
