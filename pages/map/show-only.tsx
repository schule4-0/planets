import React from "react";
import Layout from "../../app/layout";
import Map from "@/app/components/map/Map";

const MapPage: React.FC = () => {
    return (
        <Layout>
            <Map showOnly={true}/>
        </Layout>
    );
};

export default MapPage;