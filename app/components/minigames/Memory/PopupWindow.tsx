import React, {FC} from "react";
import Image from 'next/image';
import ActionButton from "@/app/components/actionButton/ActionButton";
import "./Popup.css"

type PopupWindowProps = {
    content: string;
    imageUrl: string;
    onClose: () => void;
};

const PopupWindow: FC<PopupWindowProps> = ({content, imageUrl, onClose}) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="text-black popup-box bg-white rounded-lg p-14 m-4 max-w-xl relative">
                <div className="flex items-center">
                    <div>
                        <h2 className="mb-10">Richtig!</h2>
                        <p>{content}</p>
                    </div>
                    <Image src={imageUrl} alt="Popup Image" width={150} height={150} className="ml-12"/>
                </div>
                <ActionButton onClick={onClose}/>
            </div>
        </div>
    );
};

export default PopupWindow;
