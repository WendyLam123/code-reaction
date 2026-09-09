import express from "express";
import mysql from "mysql";

const app = express();
const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    database: "code_reaction"
}
)

app.use(express.json());


//Note
app.get('/api/users', (req, res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get("/api/notes", (req, res)=>{
    const sql = "SELECT * FROM notes";
    db.query(sql, (err, notes) =>{
        if (err){
            return res.status(500).json({
                message: "Server error"
            });
        }
        return res.json(notes);
    })
})

//create new note row in Notes
app.post("/api/notes", (req, res) => {
    const {title, body} = req.body;

    const sql = `
        INSERT INTO  Notes (title, body, last_modified)
        VALUES (?, ?, NOW())
    `;

    db.query(sql, [title, body], (err, data)=>{
        if (err){
            console.log(err)
            return res.status(500).json({
                message: "Failed to create note" + err
            });
        }
        return res.json({
            id: data.insertId,
            title: title, 
            body: body, 
            last_modified: new Date()
        })
    })
})

//update note api when saved
app.put("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const {title, body} = req.body;

    const sql = `
        UPDATE  Notes
        SET title = ?, body = ?, last_modified = NOW()
        WHERE id = ?
    `;

    db.query(sql, [title, body, id], (err, data)=>{
        if (err){
            console.log(err)
            return res.status(500).json({
                message: "Failed to update note" + err
            });
        }
        return res.json({
            message: "Note updated successfully"
        })
    })
})

//delete note from database
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;

    const sql = `
        DELETE  FROM Notes
        WHERE id = ?
    `;

    db.query(sql, [id], (err, data)=>{
        if (err){
            console.log(err)
            return res.status(500).json({
                message: "Failed to delete note" + err
            });
        }
        return res.json({
            message: "Note deleted successfully"
        })
    })
})

//Learn Page
app.get('/api/levels', (req, res, next)=>{
    const sql = "SELECT * FROM levels";
    //use callback so need next(err)
    db.query(sql, (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data);
    })
});

app.get('/api/courses/', (req, res, next)=>{
    const sql = "SELECT * FROM courses";
    //use callback so need next(err)
    db.query(sql, (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data);
    })
});

app.get('/api/level/:levelId', (req, res, next)=>{
    const levelId = req.params.levelId;
    
    //get everything from levelPages, level title from levels, and course title from courses
    //join levelPages to levels based on level id
    //join the levels+levelPage table to courses table based on course id
    //result: level pages sorted by page order with level title, course title, and other info of level page (body, page title...)
    const sql = `
        SELECT 
            courses.title AS courses_title, 
            levels.title AS level_title, 
            levelPages.*
        FROM levelPages
            JOIN levels
                ON levelPages.level_id = levels.id
            JOIN courses
                ON levels.course_id = courses.id
        WHERE levels.id = ?
        ORDER BY levelPages.page
        `;

    db.query(sql, [levelId], (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data);
    })
});

app.get('/api/level/:levelId/next', (req, res, next)=>{
    const levelId = req.params.levelId;

    //get levels table
    //order the next_level by levels_id : id=1 next=5 (id: 1, 5, 6)
    //lead(id) get the next_level id
    //if no next_level return null
    //because levels are in sequence (id) and all courses pages are in it, so can directly go to next course level 1.
    
    const sql = `
        SELECT next_level_id
        FROM(
            SELECT
                id, 
                LEAD(id)
                OVER(
                    ORDER BY id
                ) AS next_level_id
            FROM levels
            )AS level_order
            WHERE id = ?        
        `;

    db.query(sql, [levelId], (err, data)=>{
        if (err){
            return next(err);
        }
        return res.json(data[0]);
    })
})

//404 hander
app.use((req, res) =>{
    res.status(404).json({
        message: "route does not exist"
    })
})

//Error handler
app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).send("Some error happened!");
})

app.listen(8080, ()=>{
    console.log("Server started on port 8080")
})