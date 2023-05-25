import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderAlfabetic, orderWeight, filterByOrigin, resetFilters, getTemperaments, filterByTemperament } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import styles from "./Home.module.css";

const Home = () => {
  const dogsPerPage = 8;
  const dogs = useSelector((state) => state.dogs);  //mira al estado global para obtener el estado global de redux y traer a dogs
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); //crea una variable de estado, y funcion para actualizar ese estado
  const [orderDirection, setOrderDirection] = useState("A-Z");
  const [orderWeightDirection, setOrderWeightDirection] = useState("asc");
  const [filterOrigin, setFilterOrigin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [firstPage, setFirstPage] = useState(1);
  const [dogsLoaded, setDogsLoaded] = useState(false);

  useEffect(() => { //cuando se monta o hay un cambio en el array de dependencias
    setLoading(true);
    setDogsLoaded(false); 
    dispatch(getDogs())
      .then(() => {
        setLoading(false);
        setDogsLoaded(true); 
      })
      .catch(() => {
        setLoading(false);
        setDogsLoaded(false); 
      });

    dispatch(getTemperaments());
  }, [dispatch]);

  const handleOrderButtonClick = () => {
    const newOrderDirection = orderDirection === "A-Z" ? "Z-A" : "A-Z";
    dispatch(orderAlfabetic(newOrderDirection));
    setOrderDirection(newOrderDirection);
  };

  const handleOrderWeightButtonClick = () => {
    const newOrderWeightDirection = orderWeightDirection === "asc" ? "desc" : "asc";
    dispatch(orderWeight(newOrderWeightDirection));
    setOrderWeightDirection(newOrderWeightDirection);
  };

  const handleFilterOrigin = (origin) => {
    setFilterOrigin(origin);
    if (origin === "Both") {
      dispatch(getDogs());
    } else {
      dispatch(filterByOrigin(origin));
    }
    setCurrentPage(1);
  };
  

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(firstPage);
  };

  const handleTemperamentChange = (event) => {
    const selectedTemperament = event.target.value;
    setSelectedTemperament(selectedTemperament);
  
    if (filterOrigin === "Both") {
  
      dispatch(getDogs()).then(() => {
        dispatch(filterByTemperament(selectedTemperament));
      });
    } else {
      dispatch(filterByTemperament(selectedTemperament));
    }
  };
  

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setCurrentPage(1);
    setSelectedTemperament("");
  };

  return (
    <div>
      <SearchBar />

      <div className={styles.filtersContainer}>
        <div className={styles.orderContainer}>
          <h4>Ordenar: </h4>
          <button onClick={handleOrderButtonClick}>
            Nombre: {orderDirection === "A-Z" ? "Z-A" : "A-Z"}
          </button>

          <button onClick={handleOrderWeightButtonClick}>
            Peso: {orderWeightDirection === "asc" ? "Descendente" : "Ascendente"}
          </button>
        </div>

        <div className={styles.filterContainer}>
          <h4>Filtrar: </h4>
          <button onClick={() => handleFilterOrigin("DB")}>Perros de: BD</button>
          <button onClick={() => handleFilterOrigin("API")}>Perros de: API</button>
          {/* <button onClick={() => handleFilterOrigin("Both")}>Perros de: Ambos</button> */}
          <button onClick={handleResetFilters} className={`${styles.deleteFiltersButton} ${styles.button}`}>
            Eliminar selección
          </button>
        </div>
      </div>

      <div>
        <label>Temperamentos: </label>
        <select value={selectedTemperament} onChange={handleTemperamentChange}>
          <option value="">Todos los temperamentos</option>
          {temperaments.map((temperament) => (
            <option key={temperament.id} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.paginationContainer}>
          <button
            onClick={goToFirstPage}
            disabled={currentPage === firstPage}
            className={styles.paginationButton}
          >
            Primera
          </button>

          <button
            onClick={goToPreviousPage}
            disabled={currentPage === firstPage}
            className={styles.paginationButton}
          >
            Anterior
          </button>

          <button onClick={goToNextPage} 
          disabled={currentPage === totalPages} 
          className={styles.paginationButton}>
            Siguiente
          </button>
        </div>
      </div>

      {loading && <h3>Cargando...</h3>}
      <CardsContainer
        className={styles.cards}
        currentPage={currentPage}
        dogsPerPage={dogsPerPage}
        dogsLoaded={dogsLoaded}
        loading={loading} 
      />
    </div>
  );
};

export default Home;



