import React, { useRef } from 'react';
import './imprint.css';
import TeamMember from '../app/components/TeamMember/TeamMember';
import Image from "next/image";
import Layout from '../app/components/layout';
import Head from "next/head";


const ImprintPage: React.FC = () => {
    const teamRef = useRef<HTMLDivElement>(null);
    const firstScreenRef = useRef<HTMLDivElement>(null);

    const scrollToTeam = () => {
        if (teamRef.current) {
            window.scrollTo({ top: teamRef.current.offsetTop, behavior: 'smooth' });
        }
    };

    const scrollToFirstScreen = () => {
        if (firstScreenRef.current) {
            window.scrollTo({ top: firstScreenRef.current.offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Head>
                <title>impressum</title>
                <meta name="description" content="Welcome to my website"/>
            </Head>
            <div ref={firstScreenRef} className="first-screen container mx-auto py-8 h-full flex flex-col">
                <div className="impressum-content">
                    <h1 className="text-4xl font-bold mb-4">Impressum</h1>
                    <h2 className="text-1xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                    <p>Benedikt Gack & Lennart Gastler Lerntechnologien GbR</p>
                    <p>Miraweg 6<br/>70565 Stuttgart</p>
                    <h2 className="text-0.5xl font-bold mb-4">Kontakt</h2>
                    <p>Telefon: +49 151 50764719<br/>E-Mail: <a
                        href="mailto:webmaster@gackundgastler.de">webmaster@gackundgastler.de</a></p>
                </div>
                <div className="astronaut-image-container mx-auto justify-center">
                    <Image className="astronaut-image" src='/images/astronaut.svg' alt='Astronaut' width={229}
                           height={363}/>
                </div>
                <div className="flex justify-center align-bottom">
                    <button className="scroll-to-team" onClick={scrollToTeam}>
                        <Image className="scroll-button-img" src='/images/downButton.svg' alt='Scroll Down' width={72}
                               height={72}/>
                    </button>
                </div>
            </div>
            <div ref={teamRef} className="team-section container mx-auto">
                <h1 className="text-4xl font-bold mb-4">Team</h1>
                <div className="team-members-container mx-auto py-8 flex justify-between">
                    <TeamMember
                        image="/images/Emma.png"
                        name="Emma Zimmermann"
                        desc1="Mobiele Medien, 6.Semester"
                        desc2="Werkstudentin UI/UX Design"
                        tags={["UI/UX Design", "Frontend Development"]}
                    />
                    <TeamMember
                        image="/images/Petya.png"
                        name="Petya Ivanova"
                        desc1="Mobile Medien, 6.Semester"
                        desc2="Werkstudentin UI/UX Design"
                        tags={["UI/UX Design", "Frontend Development"]}
                    />
                    <TeamMember
                        image="/images/Matze.png"
                        name="Matthias Stöppler"
                        desc1="Mobile Medien, 10.Semester"
                        desc2=""
                        tags={["Entwicklung"]}
                    />
                    <TeamMember
                        image="/images/Dorina.png"
                        name="Dorina Sobiecki"
                        desc1="Mobiele Medien, 6.Semester"
                        desc2="Werkstudentin App Entwicklung"
                        tags={["Entwicklung", "Management"]}
                    />
                    <TeamMember
                        image="/images/Sebastian.png"
                        name="Sebastian Maier"
                        desc1="Medien Informatk, 6.Semester"
                        desc2="Werkstudent Software Entwicklung"
                        tags={["Entwicklung"]}
                    />
                </div>
                <div className="flex justify-center">
                    <button className="scroll-to-first-screen" onClick={scrollToFirstScreen}>
                        <Image className="scroll-button-img" src='/images/upButton.svg' alt='Scroll Up' width={72}
                               height={72}/>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ImprintPage;
