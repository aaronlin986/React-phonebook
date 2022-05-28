const Search = ({newSearch, setNewSearch}) => {
    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    return (
        <div>
            Filter shown with <input value={newSearch} onChange={handleSearchChange}/>
        </div>
    );
};

export default Search;