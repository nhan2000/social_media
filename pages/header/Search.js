import React from "react";
import styles from '../../styles/search.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div>
      <div className={styles.wrap}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            placeholder="Looking for name?"
          />
          <button type="button" className={styles.btnm}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: 15, color: "white" }}
            />
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default Search
