const SearchBar = ({search, handleSearchChange}) => {
    return(
        <input 
                type='text'
                placeholder='Search...'
                className='search-input'
                value={search}
                onChange={handleSearchChange}
        />
    )
}

export default SearchBar;