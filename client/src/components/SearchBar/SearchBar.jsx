import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchDog, setSearchDog] = useState("");

  const handleInput = (e) => {
      e.preventDefault()
      setSearchDog(e.target.value)
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(getDogName(searchDog));
  }

  return(
      <div className={style.mainContainer}>
          <input className={style.searchInput} type="text" onChange={handleInput} placeholder="Search..."/>
          <button className={style.searchButton} type="submit" onClick={handleSubmit}> Buscar </button>
      </div>
  )
}