import React from 'react';
import styles from './TeamMember.module.css';
import Image from "next/image";

interface TeamMemberProps {
    image: string;
    name: string;
    desc1: string;
    desc2: string;
    tags: string[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, desc1, desc2, tags }) => {
    const sanitizeTag = (tag: string) => {
        // Replace special characters with dashes and convert to lowercase
        return tag.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
    };
    return (
        <div>
            <Image className={`${styles['team-member__image']}`} src={image} alt={name} width={185} height={185}/>
            <div className="p-3 lg:p-4">
                <h2 className="mb-1 lg:mb-1.5">{name}</h2>
                <p>{desc1}</p>
                <p>{desc2}</p>
                <ul className="mt-2.5 lg:mt-3">
                    {tags.map((tag, index) => (
                        <li key={index}
                            className={`inline-block rounded-full px-3 py-1 mb-2 text-sm mr-2 bg-green-900 ${styles[sanitizeTag(tag)]}`}>
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeamMember;