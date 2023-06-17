import { useState, useEffect } from 'react';
import personService from './services/persons';

const Input = (props) => {
  const { value, handleChange, text } = props;
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
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <Input
          key={input.text}
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

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
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
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
        key='filter'
        text='filter shown with'
        value={query}
        handleChange={handleQueryChange}
      />
      <h2>add a new</h2>
      <PersonForm handleSubmit={addNewPerson} inputs={inputs} />
      <h2>Numbers</h2>
      {personsFiltered.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
