import { useSelector } from 'react-redux';
import Card from "../Card/Card";
import style from "./CardsContainer.module.css"

const CardsContainer = () => {
    const dogs = useSelector(state=>state.dogs)

    return(
        <div className={style.container}>
            {dogs.map(dog => (
                <Card
                    key={dog.id}
                    id={dog.id}
                    image={dog.image}
                    name={dog.name}
                    temperament={dog.temperament}
                    weight={dog.weight}
                    height={dog.height}
                    createdInDb={dog.createdInDb} // agregadoooooooooooooooo
                />
            ))}
        </div>
    );
};

export default CardsContainer;

