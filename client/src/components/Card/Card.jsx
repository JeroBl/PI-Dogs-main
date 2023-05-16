import style from "./Card.module.css";

const Card = (props) => 
{
    return(
        <div className={style.card}>
            <p>Id: {props.id}</p>
            <img className={style.cardImage} src={props.image?.url} alt={props.name} /> {/* Asegurarse de que props.image no sea nulo */}
            <p>Name: {props.name}</p>
            <p className={style.temperament}>Temperament: {props.temperament}</p>
            <p>Weight: {props.weight?.metric ? `${props.weight.metric} kg` : 'N/A'}</p>
            <p>Height: {props.height?.metric ? `${props.height.metric} cm` : 'N/A'}</p>
        </div>
    )
}

export default Card;