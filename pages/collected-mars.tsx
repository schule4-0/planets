import React from 'react';
import CollectedSpaceshipPart from "@/app/components/collectedSpaceshipPart/collectedSpaceshipPart";

const CollectedMars: React.FC = () => {

    return (
        <div className="page-container bg-star">
            <CollectedSpaceshipPart imgSrc={"/images/raumschiff_bottom.png"} planet={"MARS"} nextPage={"/map"}/>
        </div>
    );
};

export default CollectedMars;
