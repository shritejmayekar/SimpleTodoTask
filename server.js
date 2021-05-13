const express = require('express');
const app = express();
const dotenv = require("dotenv");

const TodoTask = require('./models/TodoTask')

dotenv.config();

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}));

/// View Engine
app.set("view engine", "ejs");

/// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", {
            todoTasks: tasks
        });
    });
});

/// POST METHOD

app.post('/', async (req, res) => {
    console.log(req.body)
    const todoTask = new TodoTask({
        content: req.body.content
    })

    try {
        await todoTask.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
})

/// Update TodoTask

app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", {
                todoTasks: tasks,
                idTask: id
            });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, {
            content: req.body.content
        }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE TodoTask
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


const mongoose = require("mongoose");
//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log("Connected to db!");
        app.listen(3000, () => console.log("Server Up and running"));
    });


// app.listen(3000, () => {
//     console.log('listening on port 3000')
// })