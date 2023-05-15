import style from "./Card.module.css";

const Card = (props) => 
{
    return(
        <div className={style.card}>
            <p>Id:{props.id}</p>
            <img className={style.cardImage} src={props.image.url} alt={props.name} />
            <p>Name: {props.name}</p>
            <p>Temperament: {props.temperament}</p>
            <p>Weight: {props.weight.metric} kg</p>
            {/* <p>Height: {props.height.metric} cm</p> */}
        </div>
    )
}

export default Card;