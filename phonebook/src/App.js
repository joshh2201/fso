import { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';

const Notification = (props) => {
  const { message, className } = props;
  if (message === null) {
    return null;
  }
  return <div className={className}>{message}</div>;
};

const Input = (props) => {
  const { value, handleChange, text } = props;
  return (
    <div>
      {text}: <input value={value} onChange={handleChange} />
    </div>
  );
};

const Person = (props) => {
  const { person, handleClick } = props;
  const { name, number, id } = person;
  return (
    <p>
      {name} {number}{' '}
      <button data-key={id} data-name={name} onClick={handleClick}>
        delete
      </button>
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
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    errorType: null,
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    // update newName as users type in input
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // update newNumber as users type in input
    setNewNumber(event.target.value);
  };

  const handleQueryChange = (event) => {
    // update query as users type in input
    setQuery(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    // filter to check if newName is in persons already
    const nameExists = persons.filter((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber };
    if (nameExists.length > 0) {
      const updatePrompt = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(updatePrompt)) {
        const updatedPerson = { ...nameExists[0], number: newNumber };
        const updateId = updatedPerson.id;
        const { name } = updatedPerson;
        personService
          .update(updateId, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updateId ? updatedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
            updateErrorMessage(
              `Updated ${name}'${name.at(-1) === 's' ? '' : 's'} number`,
              'success'
            );
          })
          .catch(() => {
            updateErrorMessage(
              `${name} was already removed from server`,
              'error'
            );
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        updateErrorMessage(`Added ${returnedPerson.name}`, 'success');
      });
    }
  };

  const deletePerson = (event) => {
    const name = event.target.getAttribute('data-name');
    if (window.confirm(`Delete ${name}?`)) {
      const id = event.target.getAttribute('data-key');
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        updateErrorMessage(`Deleted ${name}`, 'success');
      });
    }
  };

  const updateErrorMessage = (message, type) => {
    setErrorMessage({
      message: message,
      errorType: type,
    });
    setTimeout(() => setErrorMessage({ message: null, errorType: null }), 3000);
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
      <Notification
        message={errorMessage.message}
        className={errorMessage.errorType}
      />
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
        <Person key={person.id} person={person} handleClick={deletePerson} />
      ))}
    </div>
  );
};

export default App;
