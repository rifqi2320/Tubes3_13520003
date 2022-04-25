import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchBar.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
};
    return (
        <div class="wrap">
            <div class="search">
                <input
                    type="search"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput}
                    className="searchTerm"
                    id="input_text"
                ></input>
                <button type="submit" className="searchButton">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
};
export default SearchBar;