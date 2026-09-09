import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import "https://kit.fontawesome.com/44ae50a47e.js";
import "../styles/Note.css";
import Sidebar from "../components/notes/Sidebar";
import Main from "../components/notes/Main";
import Nav from "../components/Nav";

function Note(){
    const [notes, setNotes] = useState([]);
    //get or set active note's id, know which is the note that we are reading/editing
    const [activeNote, setActiveNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNotes = async () =>{
            try{
                const res = await fetch("/api/notes");
                if (!res.ok){
                    throw new Error("Notes data not loaded");
                }

                const data = await res.json();
                setNotes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getNotes();
    }, []);

    const saveNote_database = async (note) =>{
        if (note.id){
            //if note exist, then update it
            const res = await fetch(`/api/notes/${note.id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: note.title,
                    body: note.body,
                    lastModified: Date.now()
                })
            });
            //if error: 
            if (!res.ok){
                throw new Error("Failed to update note");
            }

            console.log("Note updated")
        }else{
            //if no existing note, create new note to the Notes database
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: note.title,
                    body: note.body,
                    lastModified: Date.now()
                })
            });

            if (!res.ok){
                throw new Error("Failed to create note");
            }

            //create new note object
            const savedNote = await res.json();

            //create a new notes array: find out which one was the note that we want to save, if found, update it using the savedNote object
            setNotes(prevNotes => prevNotes.map((i) => i === note ? savedNote : i));
        }
    }

    const onAddNote = async () => {
        //create a temporary note
        const newNote = {
            tempId: Date.now(),
            title: "Untitled Note",
            body: "",
            last_modified: Date.now()
        };

        setActiveNote(newNote.tempId);

        setNotes(prevNotes => [newNote, ...prevNotes]);
    };

    const onDeleteNote = async (note) =>{
        //if note exists in the database (not temp note)
        if (note.id){
            const res = await fetch(`/api/notes/${note.id}`, {
                method: "DELETE"
            });
            if (!res.ok){
                throw new Error("Failed to delete note");
            }
        }
        //Delete note (temp or saved) from react

        setNotes((prevNotes)=>prevNotes.filter((i) => (i.id ?? i.tempId) !== (note.id ?? note.tempId)));
        if (note.id ?? note.tempId === activeNote){
            setActiveNote(null);
        }
    };

    //find the selected note object from the existing notes and information like id, body...
    const getActiveNote = () =>{
        return notes.find((note)=> (note.id ?? note.tempId) === activeNote)
    }

    const onUpdateNote = (updatedNote) =>{
        //check if the note is the updated one, if no, put the old note to the new array, if yes, put the updated note to the new array
        const updatedNotesArr = notes.map((note)=>{
            if ((note.id ?? note.tempId) === (updatedNote.id ?? updatedNote.tempId)){
                return updatedNote;
            }
            return note;
        })
        //update the notes array
        setNotes(updatedNotesArr)
    }

    return(
        <div className="note_main">
            <Nav />
            <Sidebar 
                notes={notes} 
                onAddNote={onAddNote} 
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                />
            <Main 
                //it's getActiveNote() because we only want the returned result, not the function itself. 
                //get active note object
                activeNote={getActiveNote()} 
                onUpdateNote={onUpdateNote} 
                saveNote_database={saveNote_database}
                onAddNote={onAddNote}
                />
        </div>
    )
}

export default Note;