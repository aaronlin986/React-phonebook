import { useState } from "react";

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleAddName = (e) => {
        e.preventDefault();
        if(persons.filter(p => p.name === newName).length){
          alert(`${newName} is already added to the phonebook`);
          return;
        }
        setPersons(persons.concat({name: newName, number: newNumber}));
        setNewName("");
        setNewNumber("");
      }
    
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };
    
      const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };
    
    return (
        <form onSubmit={handleAddName}>
            <div>
            Name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
            Number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default PersonForm;