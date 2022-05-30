import { useState } from "react";
import personsServices from '../services/persons';

const PersonForm = ({persons, setPersons, setMessage, setStatus}) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const handleAddName = (e) => {
      e.preventDefault();
      const foundPerson = persons.find(p => p.name === newName);

      if(foundPerson){
        if(foundPerson.number !== newNumber){
          if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
            personsServices
              .update(foundPerson.id, {...foundPerson, number: newNumber})
              .then(returnedPerson => {
                setMessage(`Updated number for ${returnedPerson.name}`);
                setStatus('success');
                setTimeout(() => {
                  setMessage(null);
                  setStatus(null);
                }, 3000);
                setPersons(persons.map(p => 
                  p.id !== returnedPerson.id 
                  ? p
                  : returnedPerson
                ));
                setNewName("");
                setNewNumber("");
              })
              .catch(error => {
                if(error.response.status === 404){
                  setMessage(`Information for ${foundPerson.name} has already been deleted from the server.`)
                  setStatus('error');
                  setTimeout(() => {
                    setMessage(null);
                    setStatus(null);
                  }, 3000);
                  setPersons(persons.filter(p => p.id !== foundPerson.id));
                  setNewName("");
                  setNewNumber("");
                }
              });
          }
        }
        else{
          alert(`${newName} is already added to the phonebook.`);
        }
        
        return;
      }

      const newPerson = {
        name: newName,
        number: newNumber
      };

      personsServices
        .create(newPerson)
        .then(returnedPerson => {
          setMessage(`Added person ${returnedPerson.name}`);
          setStatus('success');
          setTimeout(() => {
            setMessage(null);
            setStatus(null);
          }, 3000);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
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