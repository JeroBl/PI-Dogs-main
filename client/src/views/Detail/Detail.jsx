import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog, CleanDetail } from "../../redux/actions";

const Detail = (props) => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getDog(id));

    // Limpia los detalles cuando el componente se desmonta
    return () => {
      dispatch(CleanDetail());
    };
  }, [dispatch, props.match.params.id]);

  if (!dog) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Detalle del Perro</h1>
      <p>ID: {dog.id}</p>
      <p>Nombre: {dog.name}</p>
      <p>Temperamento: {dog.temperament}</p>
      <p>Imagen: {dog.image}</p>
      {/* <p>Peso: {dog.weight}</p>
      <p>Altura: {dog.height}</p> */}
      <p>Esperanza de vida: {dog.lifeSpan}</p>
    </div>
  );
};

export default Detail;
