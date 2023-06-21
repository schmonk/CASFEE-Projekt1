import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('source/client'));
app.use(bodyParser.urlencoded({ extended: true }));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  // res.send('Hello GET');
})


// Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { todo } = req.body;
  todos.push(todo);
  res.sendStatus(201);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter((_, index) => index !== parseInt(id));
  res.sendStatus(200);
});


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
