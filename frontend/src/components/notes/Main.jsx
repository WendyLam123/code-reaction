function Main({activeNote, onUpdateNote, saveNote_database}){
    const onEditField = (key, value) =>{
        onUpdateNote({
            ...activeNote,
            //update the new title and body 
            [key]: value,
            last_modified: Date.now()
        })
    }

    if (!activeNote){
        return <main className="no_active_note">No Note Selected</main>
    }

    return (
        <main>
            <header>
                <input 
                    type="text" 
                    id="note_title" 
                    autoFocus 
                    //show the existence title
                    value={activeNote.title}
                    //update changed title
                    onChange={(e)=> onEditField("title", e.target.value)}
                />
                <button 
                    onClick={()=>saveNote_database(activeNote)}
                    className="note_save">Save</button>
            </header>
            <textarea 
                id="note_body" 
                value={activeNote.body}
                onChange={(e)=>onEditField("body", e.target.value)}
            />
        </main>
    )
}

export default Main;