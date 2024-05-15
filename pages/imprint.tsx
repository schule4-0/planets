import React, { useRef } from 'react';
import './imprint.css';
import TeamMember from '@/app/components/teamMember/TeamMember';
import Image from "next/image";
import Layout from '../app/layout';
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
                <title>Impressum</title>
                <meta name="description" content="Welcome to my imprint"/>
            </Head>
            <div ref={firstScreenRef} className="h-screen relative container mx-auto p-8 flex justify-between items-center">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold mb-4">Impressum</h1>
                    <h2 className="text-1xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                    <p>Benedikt Gack & Lennart Gastler Lerntechnologien GbR</p>
                    <p>Miraweg 6<br/>70565 Stuttgart</p>
                    <h2 className="text-0.5xl font-bold mb-4">Kontakt</h2>
                    <p>Telefon: +49 151 50764719<br/>E-Mail: <a
                        href="mailto:webmaster@gackundgastler.de">webmaster@gackundgastler.de</a></p>
                </div>

                    <Image className="astronaut-image h-auto" src='/images/astronaut.svg' alt='Astronaut' width={300} height={150}/>

                <div className="flex justify-center absolute bottom-5 w-full">
                    <button className="scroll-to-team " onClick={scrollToTeam}>
                        <Image className="scroll-button-img" src='/images/down-button.svg' alt='Scroll Down' width={72}
                               height={72}/>
                    </button>
                </div>
            </div>
            <div ref={teamRef} className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-4">Team</h1>
                <div className="team-members-container mx-auto py-8 flex justify-between mb-3 flex-wrap">
                    <TeamMember
                        image="/images/emma.png"
                        name="Emma Zimmermann"
                        desc1="Mobiele Medien, 6.Semester"
                        desc2="Werkstudentin UI/UX Design"
                        tags={["UI/UX Design"]}
                    />
                    <TeamMember
                        image="/images/petya.png"
                        name="Petya Ivanova"
                        desc1="Mobile Medien, 6.Semester"
                        desc2="Werkstudentin UI/UX Design"
                        tags={["UI/UX Design"]}
                    />
                    <TeamMember
                        image="/images/matze.png"
                        name="Matthias Stöppler"
                        desc1="Mobile Medien, 10.Semester"
                        desc2=""
                        tags={["Entwicklung"]}
                    />
                    <TeamMember
                        image="/images/dorina.png"
                        name="Dorina Sobiecki"
                        desc1="Mobiele Medien, 6.Semester"
                        desc2="Werkstudentin App Entwicklung"
                        tags={["Entwicklung", "Management"]}
                    />
                    <TeamMember
                        image="/images/sebastian.png"
                        name="Sebastian Maier"
                        desc1="Medien Informatk, 6.Semester"
                        desc2="Werkstudent Software Entwicklung"
                        tags={["Entwicklung"]}
                    />
                </div>
                <div className="flex justify-center">
                    <button className="scroll-to-first-screen" onClick={scrollToFirstScreen}>
                        <Image className="scroll-button-img" src='/images/up-button.svg' alt='Scroll Up' width={72}
                               height={72}/>
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ImprintPage;
