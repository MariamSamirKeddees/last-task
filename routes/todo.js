const express = require('express');
const todos = express.Router();
const tablePage = require('../public/table.js');
const fs = require('fs');

function formTableRows(data) {
    var html = ''
    for (var i = 0; i < data.length; i++) {
        html += `<tr>
        <td>${data[i].title}</td>
        <td>${data[i].status}</td>
        </tr>`
    }
    return html;
}

todos.get('/', async (req, res) => {
    const result = fs.readFileSync('./todos.json', 'utf8')
    const todos = JSON.parse(result);
    res.send(tablePage(formTableRows(todos)));
})

todos.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const result = fs.readFileSync('./todos.json', 'utf8')
    const todos = JSON.parse(result);
    try {
        if (!parseInt(id) || todos.findIndex(todo => todo.id === +id) === -1) {
            const error = new Error();
            error.status = 400;
            error.message = 'Provided id is not valid';
            throw error;
        } else {
            const i = todos.findIndex(todo => todo.id === +id);
            res.send(tablePage(formTableRows([todos[i]])));
        }
    } catch (error) {
        next(error);
    }
})

todos.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { title, status } = req.body;
        if (!title || !status) {
            const error = new Error();
            error.status = 400;
            error.message = 'title and status are required';
            throw error;
        }
        const result = fs.readFileSync('./todos.json', 'utf8')
        const todos = JSON.parse(result);
        const newTodo = {
            id: Date.now(),
            title,
            status
        }
        todos.push(newTodo);
        fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
        res.send('success');
    } catch (error) {
        next(error);
    }

})

todos.put('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const { id, title, status } = req.body;
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'Provided id is not valid';
            throw error;
        }
        const result = fs.readFileSync('./todos.json', 'utf8')
        const todos = JSON.parse(result);
        const i = todos.findIndex(todo => todo.id === +id);
        if (title) { todos[i].title = title; }
        if (status) { todos[i].status = status; }
        fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
        res.send('success');
    } catch (error) {
        next(error);
    }
})

todos.delete('/', async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            const error = new Error();
            error.status = 501;
            error.message = 'id is required';
            throw error;
        }
        const result = fs.readFileSync('./todos.json', 'utf8')
        const todos = JSON.parse(result);
        const i = todos.findIndex(todo => todo.id === +id);
        const toDelete = todos[i];
        todos.splice(i, 1);
        fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
        res.send('success');
    } catch (error) {
        next(error);
    }

})


module.exports = todos;

