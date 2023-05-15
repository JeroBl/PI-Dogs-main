import style from "./Card.module.css";

const Card = (props) => 
{
    return(
        <div className={style.card}>
            <p>Id:{props.id}</p>
            <p>Image:{props.image}</p>
            <p>Name:{props.name}</p>
            <p>Temperament:{props.temperament}</p>
            <p>Weight:{props.weight}</p>
        </div>
    )
}

export default Card;