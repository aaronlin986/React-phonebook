import { useState } from "react";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "39-44-5323523"
    }
  ]);
  const [newSearch, setNewSearch] = useState("");

  const resultsToShow = newSearch === "" 
    ? persons 
    : persons.filter(p => p.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} setNewSearch={setNewSearch}/>
      <h2>Add a New Person</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={resultsToShow}/>
    </div>
  );
}

export default App;
