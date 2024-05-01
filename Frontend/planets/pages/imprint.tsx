import React, { useRef } from 'react';
import './imprint.css';
import ScrollIcon from './../images/downButton.svg';
import Astornaut from './../images/astronaut.svg';
import TeamMember from '../app/components/TeamMember/TeamMember';

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
                        <h1 className="text-4xl font-bold mb-4">Impressum</h1>
                        <h2 className="text-1xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                        <p>Benedikt Gack & Lennart Gastler Lerntechnologien GbR</p>
                        <p>Miraweg 6<br/>70565 Stuttgart</p>
                        <h2 className="text-0.5xl font-bold mb-4">Kontakt</h2>
                        <p>Telefon: +49 151 50764719<br/>E-Mail: <a
                            href="mailto:webmaster@gackundgastler.de">webmaster@gackundgastler.de</a></p>
                    </div>
                    <div className="astronaut-image-container">
                        <img src={Astornaut} alt="Astronaut" className="astronaut-image"/>
                    </div>
                    <button className="scroll-button" onClick={scrollToTeam}>
                        <img src={ScrollIcon} alt="Scroll Down"/>
                    </button>
                </div>
            </div>
            <div ref={teamRef} className="team-section">
                <div className="container mx-auto py-8 h-full flex flex-wrap justify-between">
                    <h1 className="text-4xl font-bold mb-4">Team</h1>

                    <div className="team-members-container">
                        <TeamMember
                            image="/../images/Emma.png"
                            name="Emma Zimmermann"
                            desc1="Mobiele Medien, 6.Semester"
                            desc2="Werkstudentin UI/UX Design"
                            tags={["UI/UX Design", "Frontend Development"]}
                        />
                        <TeamMember
                            image="/../images/Petya.png"
                            name="Petya Ivanova"
                            desc1="Mobile Medien, 6.Semester"
                            desc2="Werkstudentin UI/UX Design"
                            tags={["UI/UX Design", "Frontend Development"]}
                        />
                    </div>
                    <div className="team-members-container">
                        <TeamMember
                            image="/../images/Matze.png"
                            name="Matthias Stöppler"
                            desc1="Mobile Medien, 10.Semester"
                            desc2=""
                            tags={["Entwicklung"]}
                        />
                        <TeamMember
                            image="/../images/Dorina.png"
                            name="Dorina Sobiecki"
                            desc1="Mobiele Medien, 6.Semester"
                            desc2="Werkstudentin App Entwicklung"
                            tags={["Entwicklung", "Management"]}
                        />
                    </div>
                    <div className="team-members-container">
                        <TeamMember
                            image="/../images/Sebastian.png"
                            name="Sebastian Maier"
                            desc1="Medien Informatk, 6.Semester"
                            desc2="Werkstudent Software Entwicklung"
                            tags={["Entwicklung"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImprintPage;
