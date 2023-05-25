import { useSelector } from 'react-redux';
import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";

const CardsContainer = ({ currentPage, dogsPerPage, dogsLoaded, loading }) => { 
  const dogs = useSelector(state => state.dogs); //optener el estado global, propiedad dogs

  const indexOfLastDog = currentPage * dogsPerPage; //calculo el indice del ultimo perro de la pag actual multiplicando el numero de la pag actual por cantidad de perros
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; //calculo el indice del primer perro
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); //obtengo los perros de la pag que corresponde

  return (
    <div className={styles.container}>
      {loading ? (
      <></>
      ) : (
        dogsLoaded && 
        currentDogs.map(dog => {
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
              />
            );
          }
        })
      )}
    </div>
  );
};

export default CardsContainer;

