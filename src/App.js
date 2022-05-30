import { useState, useEffect } from "react";
import personsServices from './services/persons';
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleDeleteName = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
        personsServices
            .del(id)
            .then(() => {
              setMessage(`Deleted ${name}`);
              setStatus('success');
              setTimeout(() => {
                setMessage(null);
                setStatus(null);
              }, 3000);
              setPersons(persons.filter(p => p.id !== id));
            });
    }
  };

  const resultsToShow = newSearch === "" 
    ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} status={status}/>
      <Search newSearch={newSearch} setNewSearch={setNewSearch}/>
      <h1>Add a New Person</h1>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setStatus={setStatus}/>
      <h1>Numbers</h1>
      <Persons persons={resultsToShow} handleDeleteName={handleDeleteName}/>
    </div>
  );
}

export default App;
