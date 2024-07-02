import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import dictionaryData from '@/public/json/dictionary.json';
import {useRouter} from 'next/router';

interface DictionaryItem {
    header: string;
    info: string;
    image: string;
}

const Dictionary: React.FC = () => {
    const router = useRouter();
    const {query} = router;
    const [selectedLetter, setSelectedLetter] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<DictionaryItem[]>(dictionaryData.items);

    useEffect(() => {
        const dictionaryQuery = query.dictionary?.toString() || '';
        if (dictionaryQuery) {
            setFilteredItems(dictionaryData.items.filter(item => item.header.toLowerCase().startsWith(dictionaryQuery.toLowerCase())));
        } else {
            setFilteredItems(dictionaryData.items);
        }
    }, [query]);

    useEffect(() => {
        if (selectedLetter) {
            setFilteredItems(dictionaryData.items.filter(item => item.header.startsWith(selectedLetter)));
        } else if (!query.dictionary) {
            setFilteredItems(dictionaryData.items);
        }
    }, [selectedLetter, query.dictionary]);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    if (query.dictionary === undefined) {
        return null;
    } else {
        return (
            <div className="fixed w-full flex justify-center items-center page-container bg-black bg-opacity-50 z-50">
                <div className="w-5/6 h-5/6 bg-white text-black rounded-2xl p-6">
                    <div className="h-1/6 mb-6">
                        <div className="flex justify-between">
                            <h1>Lexikon</h1>
                            <Image src="/images/close.png" alt="schließen" width={60} height={60}
                                   onClick={() => router.push(router.pathname)}/>
                        </div>
                        <div className="text-center">
                            {alphabet.map(letter => (
                                <button
                                    key={letter}
                                    onClick={() => {
                                        setSelectedLetter(letter);
                                        router.push(`?dictionary=${letter}`, undefined, {shallow: true});
                                    }}
                                    className={`subtitles !font-bold mx-1`}
                                    style={{color: selectedLetter === letter ? 'var(--active-color)' : 'black'}}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-y-auto h-5/6">
                        {filteredItems.map((item, index) => (
                            <div key={index} className="my-4 flex items-start gap-3">
                                <Image src={item.image} alt={item.header} width={200} height={200}
                                       style={{minWidth: '200px', height: 'auto'}}/>
                                <div>
                                    <p className="subtitles">{item.header}</p>
                                    <h2>{item.info}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Dictionary;
