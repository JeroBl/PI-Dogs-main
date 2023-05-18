import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "./Home.module.css"


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
    },[dispatch])

    return(
        <div>
            <h1>Esta es la Home</h1>
            <SearchBar/>
            <CardsContainer className={style.cards}/>
        </div>
    )
}

export default Home;