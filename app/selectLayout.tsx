import React, { ReactNode } from 'react';
import "./globals.css";
import "./selectLayout.css";
import ActionButton from "@/app/components/actionButton/ActionButton";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface SelectLayoutProps {
    leftChildren: ReactNode;
    rightChildren: ReactNode;
    actionButton: ReactNode;
}

const SelectLayout: React.FC<SelectLayoutProps> = ({ leftChildren, rightChildren, actionButton }) => {
    return (
        <div className="min-h-screen bg-star">
            <div className={`${inter.className} flex justify-between p-20 z-0`}>
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
            <div className=" text-right pb-6 pr-6 pt-0 -mt-36 z-10">
                {actionButton}
            </div>
        </div>
    );
};

export default SelectLayout;
