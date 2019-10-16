const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let todoList = [
    {
        id: "0",
        desc: "no todos",
        done: false
    },
    {
        id: "1",
        desc: "1st todo",
        done: false
    },
    {
        id: "2",
        desc: "2nd todo",
        done: false
    },
];

// SHOW ALL TODO ITEMS
app.get("/todos", (req, res) => {
    res.json(todoList);
});

// SHOW SPECIFIC TODO ITEM
app.get("/todos/:id", (req, res) => {
    let todoId = parseInt(req.params.id);
    let selectedTodo = todoList.filter(data => data.id == todoId)[0];
    if (selectedTodo) {
        res.json(selectedTodo);
    } else {
        res.sendStatus(404);
    }
});

// UPDATE DONE STATUS TO TRUE
app.post("/todos/:id/done", (req, res) => {
    let todoId = parseInt(req.params.id);
    let selectedTodo = todoList.filter(data => data.id == todoId)[0];
    if (selectedTodo) {
        selectedTodo.done = true;
        res.send("Status updated")
    } else {
        console.log("Unable to update Done Status")
        res.send("Unable to update Done Status")
    }
});

// UPDATE DONE STATUS TO FALSE
app.post("/todos/:id/notdone", (req, res) => {
    let todoId = parseInt(req.params.id);
    let selectedTodo = todoList.filter(data => data.id == todoId)[0];
    if (selectedTodo) {
        selectedTodo.done = false;
        res.send("Status updated")
    } else {
        console.log("Unable to update Done Status")
        res.send("Unable to update Done Status")
    }
});

/// CREATE NEW TODO ITEM
app.post("/addtodo", (req, res) => {
    let todoItem = req.body;
    if (todoItem.id && todoItem.desc && todoItem.done) {
        todoList.push(todoItem);
        res.send(todoList);
    } else {
        console.log("Unable to add the Todo. Please fill all the required information")
        res.send("Unable to add the Todo. Please fill all the required information")
    }
});

// UPDATE SPECIFIC TODO ITEM
app.put("/updatetodo/:id", (req, res) => {
    var todoId = parseInt(req.params.id);
    var selectedTodo = todoList.filter(data => data.id == todoId)[0];
    if (selectedTodo) {
        let todoItem = req.body;
        if (todoItem.id && todoItem.desc && todoItem.done) {
            selectedTodo.desc = todoItem.desc;
            selectedTodo.done = todoItem.done;
            res.send("Updated the Todo Item");
        } else {
            console.log("Unable to update the Todo Item.")
            res.send("Unable to update the Todo Item.")
        }
    }
});

// DELETE SPECIFIC TODO ITEM
app.delete("/deletetodo/:id", (req, res) => {
    let todoId = parseInt(req.params.id);
    let selectedTodo = todoList.filter(data => data.id == todoId)[0];
    if (selectedTodo) {
        todoList = todoList.filter(data => data.id != todoId);
        res.send("Deleted the Todo Item");
        console.log(todoList);
    } else {
        res.send("Unable to delete the Todo Item");
    }
});

// CLEAR ALL TODO ITEMS
app.post("/cleartodos", (req, res) => {
    todoList = [];
    res.send("The Todo List has been cleared");
});

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})