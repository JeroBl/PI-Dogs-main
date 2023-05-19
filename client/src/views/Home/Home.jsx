import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderAlfabetic,
  orderWeight,
  filterByOrigin,
  resetFilters,
} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Home.module.css";

const Home = () => {
  const dogsPerPage = 8;
  const dogs = useSelector((state) => state.dogs);
  const totalPages = Math.ceil(dogs.length / dogsPerPage);

  const dispatch = useDispatch();
  const [orderDirection, setOrderDirection] = useState("A-Z");
  const [orderWeightDirection, setOrderWeightDirection] = useState("asc");
  const [filterOrigin, setFilterOrigin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDogs());
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
    dispatch(filterByOrigin(origin));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>Esta es la Home</h1>
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

    <button onClick={() => handleFilterOrigin("DB")}>
      Perros de: DB
    </button>

    <button onClick={() => handleFilterOrigin("API")}>
      Perros de: API
    </button>

    <button onClick={handleResetFilters}>Eliminar filtros</button>
  </div>
</div>

<div className={styles.paginationWrapper}>
  <div className={styles.paginationContainer}>
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className={styles.paginationButton}
    >
      Anterior
    </button>

    <button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className={styles.paginationButton}
    >
      Siguiente
    </button>
  </div>
</div>

      <CardsContainer
        className={styles.cards}
        currentPage={currentPage}
        dogsPerPage={dogsPerPage}
      />
    </div>
  );
};

export default Home;

