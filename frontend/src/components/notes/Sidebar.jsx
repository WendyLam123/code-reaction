
function Sidebar({
    notes, 
    onAddNote, 
    onDeleteNote,
    activeNote,
    setActiveNote,
    }){

    const sortedNotes = notes.sort((a, b) => new Date(b.last_modified) - new Date(a.last_modified));

    return (
        <aside>
            <div className="sidebar_header">
                <h2>Notes</h2>
                <button onClick={onAddNote}>Add</button>
            </div>
            <div className="sidebar_notes">

            {sortedNotes.map((note)=>(
                <div 
                    key={note.id ?? note.tempId}
                    className={`sidebar_note ${(note.id ?? note.tempId) === activeNote ? "active" : ""}`}
                    onClick={()=>setActiveNote(note.id ?? note.tempId)}
                >
                    <div className="sidebar_note_title">
                        <strong className="note_title">{note.title}</strong>
                        <button onClick={() => onDeleteNote(note)} className="note_delete">Delete</button>
                    </div>
                    <p className="sidebar_note_content">{note.body && note.body.substr(0,50) + "..."}</p>
                    <small className="note_meta">Last modified {new Date(note.last_modified).toLocaleDateString("en-GB", {
                        hour: "2-digit", 
                        minute: "2-digit"
                    })}</small>
                </div>
            ))}

            
            </div>

        </aside>
    )
}

export default Sidebar;