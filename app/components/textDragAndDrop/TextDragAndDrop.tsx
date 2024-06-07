import React, { FC, useEffect, useState } from 'react';

interface ActionButtonProps {
    jsonFile: JsonData;
}

interface DragText {
    text: string;
    dropZoneId: string[];
}
interface dropZone {
    text: string;
    id: string;
}
interface DropZones {
    image: string;
    dropZone: dropZone[]
}

interface JsonData {
    header: string;
    infoText: string;
    dragText: DragText[];
    dropZones: DropZones;
}

const TextDragAndDrop: FC<ActionButtonProps> = ({ jsonFile }) => {
    const [data, setData] = useState<JsonData | null>(null);
    const [draggedText, setDraggedText] = useState<string | null>(null);

    useEffect(() => {
        // Use the JSON data directly
        setData(jsonFile);
    }, [jsonFile]);

    const handleDragStart = (text: string) => {
        setDraggedText(text);
        console.log(`Dragging: ${text}`);
    };

    const handleDrop = (zone: string) => {
        console.log(`Dropped on zone: ${zone}`);
        if (draggedText) {
            console.log(`Dragged text: ${draggedText}`);
            // You can add further checks or logic here
            const isCorrect = data?.dragText.find(item => item.text === draggedText)?.dropZoneId.includes(zone);
            if (isCorrect) {
                console.log('Correct match!');
            } else {
                console.log('Incorrect match.');
            }
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"flex px-7 py-8"}>
            <div className={"w-2/5"}>
                <h1 className={"mb-12"}>{data.header}</h1>
                <div className="drag-container">
                    {data.dragText.map((item, index) => (
                        <div
                            className={"ml-12 bg-white rounded-l-3xl rounded-r-3xl py-2 px-5 min-w-fit w-52 h1-sub text-center text-black mb-8"}
                            key={index}
                            draggable
                            onDragStart={() => handleDragStart(item.text)}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
                <p className={"mt-4"}>{data.infoText}</p>
            </div>
            <div className="drop-zones w-3/5 bg-cover h1-sub" style={{backgroundImage: `url(${data.dropZones.image})`}}>
                <div className={"h-full flex flex-col flex-wrap justify-between w-fit m-auto pl-12"}>
                    {data.dropZones.dropZone.map((zone) => (
                        <div
                            key={zone.id}
                            className="drop-zone flex gap-8 flex-wrap w-fit"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(zone.id)}
                        >
                            <div className={"border-4 rounded-l-3xl rounded-r-3xl min-w-fit text-center text-black w-52 h-20 "}></div>
                            {zone.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TextDragAndDrop;
