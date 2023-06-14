import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import './ListDetail.css'

const ListDetail = ({ user }: { user: string }) => {
    const { listName } = useParams()
    // Mock data for todo list entries
    const [entries, setEntries] = useState<{
        entry_text: string,
        completed: boolean,
    }[]>([]);

    useEffect(() => {
        fetch('https://sgr2023.web.ua.pt/getEntries.php', {
            method: 'POST',
            body: JSON.stringify({ username: user, list_name: listName }),
        })
            .then((res) => res.json())
            .then((data) => {
                setEntries(data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (scrollableDiv.current) {
            scrollableDiv.current.scrollTop = scrollableDiv.current.scrollHeight;
        }
    }, [entries.length]);

    // State for new entry input
    const [newEntryText, setNewEntryText] = useState('');

    // Function to add a new entry
    const addEntry = () => {
        if (newEntryText.trim() !== '') {
            const newEntry = {
                entry_text: newEntryText,
                completed: false,
            };
            setEntries([...entries, newEntry]);
            setNewEntryText('');
            fetch('https://sgr2023.web.ua.pt/addEntry.php', {
                method: 'POST',
                body: JSON.stringify({ username: user, list_name: listName, entry_text: newEntry.entry_text }),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                }
                ).catch((err) => {
                    console.log(err);
                }
                );
        }
    };

    const scrollableDiv = useRef<HTMLDivElement>(null);


    return (
        <div className='listContainer'>
            <h2 className='listName'>Todo List Details ({listName})</h2>
            <div className='listEntriesContainer' ref={scrollableDiv}>
                {entries.map((entry, index) => (
                    <div key={index} className='entrieContainer'>

                        <p style={{
                            textDecoration: entry.completed ? 'line-through' : 'none',
                            backgroundColor: entry.completed ? 'lightgreen' : 'transparent',
                        }}>
                            {entry.entry_text}
                        </p>
                        <div className='entryActions'>

                            <input
                                type="checkbox"
                                checked={entry.completed}
                                className='entryCheckbox'
                                onChange={() => {
                                    setEntries(
                                        entries.map((e, index2) => {
                                            if (index === index2) {
                                                e.completed = !e.completed;
                                            }
                                            return e;
                                        }
                                        )
                                    );
                                }}
                            />
                            <FaTrash style={{
                                color: 'red',
                            }} onClick={() => {
                                setEntries(entries.filter((e, index2) => index !== index2))
                            }} />
                        </div>

                    </div>
                ))}
                <input
                    type="text"
                    value={newEntryText}
                    className='newEntryInput'
                    onChange={(e) => setNewEntryText(e.target.value)}
                    placeholder="Enter new entry"
                />
                <button
                    onClick={addEntry}
                    className='addEntryButton'
                >Add Entry</button>
            </div>
        </div>
    );
};

export default ListDetail;
