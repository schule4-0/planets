import {Inter} from "next/font/google";
import "./globals.css"
import "./selectLayout.css"

const inter = Inter({subsets: ["latin"]});

import React, {ReactNode} from 'react';

interface SelectLayoutProps {
    leftChildren: ReactNode;
    rightChildren: ReactNode;
}

const SelectLayout: React.FC<SelectLayoutProps> = ({leftChildren, rightChildren}) => {
    return (
        <div className={`${inter.className} min-h-screen flex justify-between p-20 bg-star`}>

            <div className="w-2/5 mr-28 border--black--yellow">
                <div className="inner-box">
                    {leftChildren}
                </div>
            </div>

            <div className="w-3/5 border--black--yellow">
                <div className="inner-box">
                    {rightChildren}
                </div>
            </div>
        </div>
    );
};

export default SelectLayout;