
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState("");

  const handleInput = (e) => {
    setSearchDog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(searchDog));
    setSearchDog("");
  };

  return (
    <div className={`${style.mainContainer} ${style.searchbarContainer}`}>
      <div className={style.searchContainer}>
        <input
          className={style.searchInput}
          type="text"
          value={searchDog}
          onChange={handleInput}
          placeholder="Search..."
        />
        <button
          className={style.searchButton}
          type="submit"
          onClick={handleSubmit}
          style={{ backgroundColor: "#007bff", color: "#fff", height: "38px" }}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
