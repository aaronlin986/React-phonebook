const Persons = ({persons, handleDeleteName}) => {
    return (
        <ul>
            {persons.map(p => 
                <li key={p.id}>
                    {p.name} {p.number} 
                    <button onClick={() => handleDeleteName(p.id, p.name)}>Delete</button>
                </li>
            )}
        </ul>
    );
};

export default Persons;