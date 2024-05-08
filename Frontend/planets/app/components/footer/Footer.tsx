import React from 'react';
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="text-white p-5 lg:p-6" style={{ backgroundColor: "#222823" }} >
            <div className="mx-auto flex flex-col sm:flex-row justify-between" >
                <div className="mb-2 lg:mb-0">Planeten Entdecker 1.0</div>
                <div><Link href="/" className="underline">Privacy Policy etc.</Link></div>
            </div>
        </footer>
    );
}

export default Footer;