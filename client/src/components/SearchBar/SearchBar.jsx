import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState(""); //variable de estado vacio, y funcion para actualizar ese estado

  const handleInput = (e) => {
    setSearchDog(e.target.value); //cuando hay cambia campo de entrada, actualiza el estado searchDog
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(searchDog)); //despacha con valor de searchDog
    setSearchDog("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className={`${style.mainContainer} ${style.searchbarContainer}`}>
      <div className={style.searchContainer}>
        <input
          className={style.searchInput}
          type="text"
          value={searchDog}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
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
