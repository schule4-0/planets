import React, { useRef } from 'react';
import './imprint.css';
import ScrollIcon from '../images/downButton.svg';

const ImprintPage: React.FC = () => {
    const teamRef = useRef<HTMLDivElement>(null);

    const scrollToTeam = () => {
        if (teamRef.current) {
            window.scrollTo({ top: teamRef.current.offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="first-screen">
                <div className="container mx-auto py-8 h-full flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Imprint</h1>
                        <h2 className="text-1xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                        <p>Benedikt Gack & Lennart Gastler Lerntechnologien GbR</p>
                        <p>Miraweg 6<br />70565 Stuttgart</p>
                        <h2 className="text-0.5xl font-bold mb-4">Kontakt</h2>
                        <p>Telefon: +49 151 50764719<br />E-Mail: <a href="mailto:webmaster@gackundgastler.de">webmaster@gackundgastler.de</a></p>
                        <h3>Team</h3>
                    </div>
                    <button className="scroll-button" onClick={scrollToTeam}>
                        <img src={ScrollIcon} alt="Scroll Down" />
                    </button>
                </div>
            </div>
            <div ref={teamRef} className="team-section">
                <div className="container mx-auto py-8 h-full flex flex-col justify-between">
                    <h1 className="text-2xl font-bold mb-4">Team</h1>
                </div>
            </div>
        </div>
    );
};

export default ImprintPage;
