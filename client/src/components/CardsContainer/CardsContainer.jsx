import { useSelector } from 'react-redux';
import Card from "../Card/Card";
import styles from "./CardsContainer.module.css"

const CardsContainer = ({ currentPage, dogsPerPage }) => {
  const dogs = useSelector(state => state.dogs);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
  
  return (
    <div className={styles.container}>
      {currentDogs.map(dog => {
        if (dog.createdInDb) {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              temperaments={dog.temperaments}
              weight={dog.weight}
              height={dog.height}
              createdInDb={dog.createdInDb}
            />
          );
        } else {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              temperament={dog.temperament}
              weight={dog.weight}
              height={dog.height}
              createdInDb={dog.createdInDb}
            />
          );
        }
      })}
    </div>
  );
};

export default CardsContainer;
