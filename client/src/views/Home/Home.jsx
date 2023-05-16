import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
    },[])

    return(
        <>
            <h1>Esta es la Home</h1>
            <SearchBar/>
            <CardsContainer/>
        </>
    )
}

export default Home;