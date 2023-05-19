import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs, orderAlfabetic, orderWeight, filterByOrigin, resetFilters } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const [orderDirection, setOrderDirection] = useState("A-Z");
  const [orderWeightDirection, setOrderWeightDirection] = useState("asc");
  const [filterOrigin, setFilterOrigin] = useState(null);

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

  return (
    <div>
      <h1>Esta es la Home</h1>
      <SearchBar />
      <div className={style.filtersContainer}>
        <div className={style.orderContainer}>
          <h4>Ordenar: </h4>
          <button onClick={handleOrderButtonClick}>
            Nombre: {orderDirection === "A-Z" ? "Z-A" : "A-Z"}
          </button>

          <button onClick={handleOrderWeightButtonClick}>
            Peso: {orderWeightDirection === "asc" ? "Descendente" : "Ascendente"}
          </button>
        </div>

        <div className={style.filterContainer}>
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

      

      <CardsContainer className={style.cards} />
    </div>
  );
};

export default Home;

