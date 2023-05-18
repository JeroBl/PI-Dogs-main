import { useHistory } from 'react-router-dom';
import style from "./Card.module.css";

const Card = (props) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/dogs/detail/${id}`);
  };

  return (
    <div className={style.card} onClick={() => handleClick(props.id)}>
      <p>Id: {props.id}</p>
      <img className={style.cardImage} src={props.image?.url} alt={props.name} /> {/* Asegurarse de que props.image no sea nulo */}
      <h3> {props.name} </h3>
      <p className={style.temperament}>Temperamento: {props.temperament}</p>
      <p>Peso: {props.weight?.metric ? `${props.weight.metric} kg` : 'N/A'}</p>
      {/* <p>Height: {props.height?.metric ? `${props.height.metric} cm` : 'N/A'}</p> */}
    </div>
  );
};

export default Card;
