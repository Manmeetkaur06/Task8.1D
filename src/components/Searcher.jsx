import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons'; 
import './Searcher.css'; 

// Searcher component for handling search and filter input
const Searcher = ({ searchQuery, handleSearchChange, handleFilterClick }) => {
  return (
    <div className="search-bar-container">
      {/* Search icon */}
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search question by title, tag or date"
        value={searchQuery}
        onChange={handleSearchChange} // Call handler on input change
        className="search-bar-input"
      />
      
      {/* Filter icon with click handler */}
      <FontAwesomeIcon icon={faSlidersH} className="search-bar-filter-icon" onClick={handleFilterClick} />
    </div>
  );
};

export default Searcher;

