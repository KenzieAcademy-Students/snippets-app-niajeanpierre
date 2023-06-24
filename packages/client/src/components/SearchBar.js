import React, { useState } from 'react';

const SearchBar = ({ setKeywords }) => {
  const [searchUserInput, setSearchUserInput] = useState("")

  const handleSearchInputChange = (event) => {
    setSearchUserInput(event.target.value);
    setKeywords(event.target.value);
  }

  const handleClearSearchInput = () => {
    setSearchUserInput("");
    setKeywords("");
  }

  return (
    <div className='searchBar'>
      <input 
      type='text'
      placeholder='Search Here.'
      value={searchUserInput}
      onChange={handleSearchInputChange}
      />
      {searchUserInput && (
        <button onClick={handleClearSearchInput}>
          Clear Search
          </button>
      )}
    </div>
  )
}

export default SearchBar;