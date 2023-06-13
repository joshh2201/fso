import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addNewName = (event) => {
    event.preventDefault();
    const nameExists = personCopy.filter((person) => person.name === newName);
    if (nameExists.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName('');
    }
  };

  const personCopy = [...persons];

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personCopy.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
