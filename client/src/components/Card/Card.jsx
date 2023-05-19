import { useHistory } from 'react-router-dom';
import style from "./Card.module.css";

const Card = (props) => {
  const history = useHistory();
  const createdInDb = props.createdInDb;

  const handleClick = (id) => {
    history.push(`/dogs/detail/${id}`);
  };

  if (createdInDb) {
    return (
      <div className={style.card} onClick={() => handleClick(props.id)}>
        <div>
          <img className={style.cardImage} src={props.image} alt={props.name} />
        <h3> {props.name} </h3>
          <p>Peso: {props.weight}</p>
          <p className={style.temperament}>Temperamento: {props.temperament}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.card} onClick={() => handleClick(props.id)}>
        <div>
          <img className={style.cardImage} src={props.image?.url} alt={props.name} />
        <h3> {props.name} </h3>
          <p>Peso: {props.weight?.metric ? `${props.weight.metric} kg` : 'N/A'}</p>
          <p className={style.temperament}>Temperamento: {props.temperament}</p>
        </div>
      </div>
    );
  }
  
   
}

export default Card;

