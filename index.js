const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const todoRouter = require('./routes/todo');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`server running at http://localhost:${port}`));

app.use(express.json());

app.get(['/', '/home'], async (req, res) => {
    const home = path.join(__dirname, 'public', 'home.html')
    const html = await fs.readFile(home, 'utf8');
    res.send(html);
});

app.use('/todos', todoRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send({ message: err.message })
})


