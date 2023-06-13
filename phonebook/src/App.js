import { useState } from 'react';

const Input = (props) => {
  const { value, handleChange, text } = props;
  console.log(value, text, handleChange);
  return (
    <div key={text}>
      {text}: <input value={value} onChange={handleChange} />
    </div>
  );
};

const Person = (props) => {
  const { name, number } = props;
  return (
    <p key={name}>
      {name} {number}
    </p>
  );
};

const PersonForm = (props) => {
  const { handleSubmit, inputs } = props;
  console.log(inputs);
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <Input
          text={input.text}
          value={input.value}
          handleChange={input.handleChange}
        />
      ))}
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  const handleNameChange = (event) => {
    // update newName as users type in input
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // update newName as users type in input
    setNewNumber(event.target.value);
  };

  const handleQueryChange = (event) => {
    // update newName as users type in input
    setQuery(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    // filter to check if newName is in persons already
    const nameExists = persons.filter((person) => person.name === newName);
    if (nameExists.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const inputs = [
    { text: 'name', value: newName, handleChange: handleNameChange },
    { text: 'number', value: newNumber, handleChange: handleNumberChange },
  ];

  const personsFiltered = persons.filter((person) => {
    if (query !== '') {
      const name = person.name.toLowerCase();
      return name.search(query.toLowerCase()) !== -1;
    }
    return true;
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        text='filter shown with'
        value={query}
        handleChange={handleQueryChange}
      />
      <h2>add a new</h2>
      <PersonForm handleSubmit={addNewPerson} inputs={inputs} />
      <h2>Numbers</h2>
      {personsFiltered.map((person) => (
        <Person name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
