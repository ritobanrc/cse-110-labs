import './App.css';

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter, ToggleTheme } from "./hooksExercise"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect, useContext } from 'react';

function App() {
    const [favorites, setFavorites] = useState(new Map<number, Note>());
    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
    };
    const [createNote, setCreateNote] = useState(initialNote);

    const createNoteHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNotes([...notes, createNote]);
    };

    return (
        <div className='app-container'>
            <div>
                <form className="note-form" onSubmit={createNoteHandler}>
                    <div>
                        <input
                            placeholder="Note Title"
                            onChange={(event) =>
                                setCreateNote({ ...createNote, title: event.target.value })}
                            required>
                        </input>
                    </div>

                    <div>
                        <textarea
                            onChange={(event) =>
                                setCreateNote({ ...createNote, content: event.target.value })}
                            required>
                        </textarea>
                    </div>

                    <div>
                        <select
                            onChange={(event) =>
                                setCreateNote({ ...createNote, label: event.target.value as Label })}
                            required>
                            <option value={Label.other}>Other</option>
                            <option value={Label.personal}>Personal</option>
                            <option value={Label.study}>Study</option>
                            <option value={Label.work}>Work</option>
                        </select>
                    </div>

                    <div><button type="submit">Create Note</button></div>
                </form>
                <div className="note-form">
                    <button>Toggle Theme (TODO)</button>
                </div>
                <div>
                    <h2>List of favorites</h2>
                    {Array.from(favorites.values()).map(n => <>{n.title}<br/></>)}
                </div>
            </div>

            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="note-item"
                    >
                        <div className="note-header">
                            <button
                                className={favorites.has(note.id) ? "note-unfavorite" : "note-favorite"}
                                onClick={() => {
                                    if (favorites.has(note.id))
                                        favorites.delete(note.id);
                                    else
                                        favorites.set(note.id, note as Note);
                                    setFavorites(new Map<number, Note>(favorites));
                                }}
                            >&#x2764;</button>
                            <button onClick={() => setNotes(notes.filter(n => n.id != note.id))}>x</button>
                        </div>
                        <h2 contentEditable> {note.title} </h2>
                        <p contentEditable> {note.content} </p>
                        <p contentEditable> {note.label} </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

