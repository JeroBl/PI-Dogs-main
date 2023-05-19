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
      <button onClick={handleOrderButtonClick}>
        Ordenar alfabeticamente: {orderDirection === "A-Z" ? "Z-A" : "A-Z"}
      </button>

      <button onClick={handleOrderWeightButtonClick}>
        Ordenar por Peso: {orderWeightDirection === "asc" ? "Descendente" : "Ascendente"}
      </button>

      <button onClick={() => handleFilterOrigin("DB")}>
        Mostrar perros de: DB
      </button>
      
      <button onClick={() => handleFilterOrigin("API")}>
        Mostrar perros de: API
      </button>

      <button onClick={handleResetFilters}>Eliminar filtros</button>

      <CardsContainer className={style.cards} />
    </div>
  );
};

export default Home;

