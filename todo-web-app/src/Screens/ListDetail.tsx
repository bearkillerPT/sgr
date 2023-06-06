import React, { useState } from 'react';

const ListDetail = ({ listId = "123" }) => {
    // Mock data for todo list entries
    const [entries, setEntries] = useState([
        { id: 1, text: 'Finish report', completed: false },
        { id: 2, text: 'Attend meeting', completed: true },
    ]);

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

    return (
        <div>
            <h2>Todo List Details (ID: {listId})</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <input
                            type="checkbox"
                            checked={entry.completed}
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
                        {entry.text}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newEntryText}
                    onChange={(e) => setNewEntryText(e.target.value)}
                    placeholder="Enter new entry"
                />
                <button onClick={addEntry}>Add Entry</button>
            </div>
        </div>
    );
};

export default ListDetail;
