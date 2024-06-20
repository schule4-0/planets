import React, {FC, useEffect, useState} from 'react';

interface TextDragAndDropProps {
    jsonFile: JsonData;
    actionButton: React.ReactNode;
}

interface DragText {
    text: string;
    dropZoneId: string[];
}

interface DropZone {
    text: string;
    id: string;
}

interface DropZones {
    image: string;
    dropZone: DropZone[];
}

interface JsonData {
    header: string;
    infoText: string;
    dragText: DragText[];
    dropZones: DropZones;
}

const TextClick: FC<TextDragAndDropProps> = ({jsonFile, actionButton}) => {
    const [data, setData] = useState<JsonData | null>(null);
    const [selectedItem, setSelectedItem] = useState<DragText | null>(null);
    const [zoneItems, setZoneItems] = useState<{ [key: string]: DragText | null }>({});
    const [droppedItems, setDroppedItems] = useState<DragText[]>([]);
    const [incorrectDrop, setIncorrectDrop] = useState<{ zoneId: string | null, text: string | null }>({
        zoneId: null,
        text: null
    });

    useEffect(() => {
        setData(jsonFile);
        const initialZoneItems: { [key: string]: DragText | null } = {};
        jsonFile.dropZones.dropZone.forEach(zone => {
            initialZoneItems[zone.id] = null;
        });
        setZoneItems(initialZoneItems);
    }, [jsonFile]);

    const selectItem = (item: DragText) => {
        setSelectedItem(item);
    };

    const checkSelectedItem = (zone: DropZone) => {
        if (!selectedItem) return;
        if (zoneItems[zone.id] !== null) return;

        // Check if the selectedItem can be dropped into this zone
        if (selectedItem.dropZoneId.includes(zone.id)) {
            // Update the zoneItems state
            setZoneItems(prev => ({
                ...prev,
                [zone.id]: selectedItem
            }));

            // Add the selectedItem to droppedItems
            setDroppedItems(prev => [...prev, selectedItem]);
        } else {
            // Handle incorrect drop
            setIncorrectDrop({zoneId: zone.id, text: selectedItem.text});
            setTimeout(() => setIncorrectDrop({zoneId: null, text: null}), 1000);
        }

        // Clear selectedItem after dropping
        setSelectedItem(null);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex px-7 py-8 pr-0 min-page-container">
            <div className="w-2/5">
                <h1 className="mb-12">{data.header}</h1>
                <div className="drag-container">
                    {data.dragText.map((item, index) => (
                        <div
                            className={`ml-12 rounded-l-3xl rounded-r-3xl py-2 px-5 min-w-fit w-52 h1-sub text-center text-black mb-5 bg-white
                            ${droppedItems.includes(item) ? 'invisible' : ''} 
                            ${selectedItem === item ? ' mb-1 border-8' : ''}`}
                            style={{
                                ...(selectedItem === item ? {borderColor: 'var(--active-color)'} : {})
                            }}
                            key={index}
                            onClick={() => selectItem(item)}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
                <p className="mt-4">{data.infoText}</p>
            </div>
            <div className="drop-zones w-3/5 bg-cover h1-sub" style={{backgroundImage: `url(${data.dropZones.image})`}}>
                <div className="h-full flex flex-col flex-wrap justify-between w-fit m-auto pl-24">
                    {data.dropZones.dropZone.map((zone) => (
                        <div
                            key={zone.id}
                            className="drop-zone flex gap-8 flex-wrap w-fit items-center"
                            onClick={() => checkSelectedItem(zone)}
                        >
                            <div
                                className={`border-4 rounded-l-3xl pt-2 rounded-r-3xl min-w-fit text-center text-white w-52 h-14 
            ${incorrectDrop.zoneId === zone.id ? 'border-0 bg-red-700' : ''} 
            ${zoneItems[zone.id] ? 'bg-green-700 border-0' : ''}`}
                            >
                                {zoneItems[zone.id]?.text || (incorrectDrop.zoneId === zone.id && incorrectDrop.text) || ""}
                            </div>
                            {zone.text}
                        </div>
                    ))}
                </div>
            </div>
            {droppedItems.length === data.dropZones.dropZone.length && (
                actionButton
            )}
        </div>
    );
};

export default TextClick;
