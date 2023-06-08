import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import './ListDetail.css'

const ListDetail = () => {
    const { listName } = useParams()
    // Mock data for todo list entries
    const [entries, setEntries] = useState([
        //{ id: 1, text: 'Test completed', completed: true },
        //{ id: 2, text: 'Test not completed', completed: false },
        { id: 1, text: 'Test completed', completed: true },
        { id: 2, text: 'Test not completed', completed: false }
    ]);

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
                id: entries.length + 1,
                text: newEntryText,
                completed: false,
            };
            setEntries([...entries, newEntry]);
            setNewEntryText('');
        }
    };

    const scrollableDiv = useRef<HTMLDivElement>(null);


    return (
        <div className='listContainer'>
            <h2 className='listName'>Todo List Details ({listName})</h2>
            <div className='listEntriesContainer' ref={scrollableDiv}>
                {entries.map((entry) => (
                    <div key={entry.id} className='entrieContainer'>

                        <p style={{
                            textDecoration: entry.completed ? 'line-through' : 'none',
                            backgroundColor: entry.completed ? 'lightgreen' : 'transparent',
                        }}>
                            {entry.text}
                        </p>
                        <div className='entryActions'>

                            <input
                                type="checkbox"
                                checked={entry.completed}
                                className='entryCheckbox'
                                onChange={() => {
                                    setEntries(
                                        entries.map((e) => {
                                            if (e.id === entry.id) {
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
                                setEntries(entries.filter((e) => e.id !== entry.id))
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
