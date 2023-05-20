import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog, CleanDetail } from "../../redux/actions";
import style from "./Detail.module.css";

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

  const createdInDb = dog.createdInDb;

  const minWeightKg = Number(dog.weight.metric?.split(" - ")[0]);
  const maxWeightKg = Number(dog.weight.metric?.split(" - ")[1]);

  const minHeightCm = Number(dog.height.metric?.split(" - ")[0]);
  const maxHeightCm = Number(dog.height.metric?.split(" - ")[1]);

  const lifeSpan = dog.life_span?.replace("years", "años");

  const imageURL = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;

  if (createdInDb) {
    return (
      <div>
        <h1>Nombre: {dog.name}</h1>
        <img className={style.image} src={dog.image} alt="Dog" />
        {dog.temperaments && dog.temperaments.length > 0 && (
          <h3>Temperamentos: {dog.temperaments.map((temperaments) => temperaments.name).join(", ")}</h3>
        )}
        <h3>Esperanza de vida: {dog.life_span} años</h3>
        <h3>Peso: {dog.weight} kg</h3>
        <h3>Altura: {dog.height} cm</h3>
        <h4>ID: {dog.id}</h4>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Nombre: {dog.name}</h1>
        <img className={style.image} src={imageURL} alt="Dog" />
        {dog.temperament && (
          <h3>Temperamentos: {dog.temperament}</h3>
        )}
        <h3>Esperanza de vida: {lifeSpan}</h3>
        <h3>Peso: {minWeightKg} - {maxWeightKg} kg</h3>
        <h3>Altura: {minHeightCm} - {maxHeightCm} cm</h3>
        <h4>ID: {dog.id}</h4>
      </div>
    );
  }
};

export default Detail;


