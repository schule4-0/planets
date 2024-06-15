import React from 'react';
import CollectedSpaceshipPart from "@/app/components/collectedSpaceshipPart/collectedSpaceshipPart";

const CollectedMars: React.FC = () => {

    return (
        <div className="page-container bg-star">
            <CollectedSpaceshipPart imgSrc={"/images/raumschiff_middle2.png"} planet={"MERCURY"} nextPage={"/map"}/>
        </div>
    );
};

export default CollectedMars;
