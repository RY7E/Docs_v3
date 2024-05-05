const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const noteSchema = require("./models/note")

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    let notes = await noteSchema.find();
    res.render("notes", {notes});
})

app.get("/createNote", (req, res) => {
    res.render("createNote");
})

app.post("/create", async (req, res) => {
    let {title, desc} = req.body;
    let createdNote = noteSchema.create({
        title,
        desc,
    })
    res.redirect('/')
})


app.get("/edit/:id", async (req, res) => {
    let note = await noteSchema.findOne({_id: req.params.id})
    res.render("edit", {note});
})

app.post('/update/:id', async (req, res) => {
    let {title, desc} = req.body;
    let note = await noteSchema.findOneAndUpdate({_id: req.params.id}, {title, desc}, {new: true});
    res.redirect('/');
})

app.get("/delete/:id", async (req, res) => {
    let deletedNote = await noteSchema.findOneAndDelete({_id: req.params.id});
    res.redirect('/');
})


app.listen(port);