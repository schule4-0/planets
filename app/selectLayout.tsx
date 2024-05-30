import React, {ReactNode} from 'react';
import "./globals.css";
import "./selectLayout.css";

interface SelectLayoutProps {
    leftChildren: ReactNode;
    rightChildren: ReactNode;
    actionButton: React.ReactNode;
}

const SelectLayout: React.FC<SelectLayoutProps> = ({leftChildren, rightChildren, actionButton}) => {
    return (
        <div className="page-container">
            <div className="h-4/5">
                <div className="flex justify-between p-20 z-0 h-full">
                    <div className="w-2/6 border--black--yellow">
                        <div className="inner-box flex items-center">
                            {leftChildren}
                        </div>
                    </div>

                    <div className="w-3/6 border--black--yellow">
                        <div className="inner-box overflow-auto">
                            {rightChildren}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-1/5 flex justify-end items-end">
                <div className="text-right">
                    {actionButton}
                </div>
            </div>
        </div>
    );
};

export default SelectLayout;
