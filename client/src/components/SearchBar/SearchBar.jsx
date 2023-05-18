import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./SearchBar.module.css"; 

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const enterSearch = (event) => {
    if (event.key === "Enter") {
      navigateToSearch();
    }
  };

  const clickSearch = () => {
    navigateToSearch();
  };

  const navigateToSearch = () => {
    const queryParams = { name: inputValue };
    const search = new URLSearchParams(queryParams).toString();
    history.push(`/name?${search}`);
  };

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className={style.mainContainer}>
      <input className={style.searchInput} onChange={inputHandler} onKeyDown={enterSearch} type="text" placeholder="Inserte el nombre"/>
      <button className={style.searchButton} onClick={clickSearch}>Buscar</button>
    </section>
  );
};

export default SearchBar;
