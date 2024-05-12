
const Search = ({search, setSearch,handleSearch}) => {

    return <>
        <div className="search-engine">
            
            <input type="text" className="city-search"
            placeholder="Enter City Name"
            name="search"
            value={search}
            required
            onChange={(event) => setSearch(event.target.value)}/>
       

        <button type="submit" className="search-btn" 
        onClick={handleSearch}>Search Weather</button>
         </div>
    </>

}

export default Search;