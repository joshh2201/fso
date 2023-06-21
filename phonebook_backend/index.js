const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const Person = require('./models/person');
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let persons = [];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/info', (request, response) => {
  const message = `<p>Phonebook has info for ${
    persons.length
  }</p><p>${new Date().toString()}</p>`;
  response.send(message);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId = 10000000;
  let id;
  do {
    id = Math.floor(Math.random() * maxId);
  } while (persons.some((person) => person.id === id));
  return id;
};

const sendErrorResponse = (response, message) => {
  return response.status(400).json({ error: message });
};
app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.number && !body.name) {
    return sendErrorResponse(response, 'Name and Number Missing');
  } else if (!body.number) {
    return sendErrorResponse(response, 'Number Missing');
  } else if (!body.name) {
    return sendErrorResponse(response, 'Name Missing');
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
