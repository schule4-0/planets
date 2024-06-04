import React, { FC } from "react";
import Image from 'next/image';
import ActionButton from "@/app/components/actionButton/ActionButton";
import "./Popup.css"

type PopupWindowProps = {
    content: string;
    imageUrl: string;
    onClose: () => void;
};

const PopupWindow: FC<PopupWindowProps> = ({ content, imageUrl, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="popup-box bg-white rounded-lg p-8 max-w-xl relative">
                <h2 className="text-black text-left text-xl font-bold mb-16 h2">Richtig!</h2>
                <div className="flex justify-between items-center">
                    <p className="text-black text-left mb-4">{content}</p>
                    <Image src={imageUrl} alt="Popup Image" width={150} height={150} className="ml-4"/>
                </div>
                <div className="flex justify-center mt-4">
                    <ActionButton onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default PopupWindow;
