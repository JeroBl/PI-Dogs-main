import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_DOGNAME = "GET_DOGNAME";
export const CLEANDETAIL = "CLEANDETAIL";



export const getDogs = () => {
    return async function(dispatch){
        const allDogs = await axios.get(`http://localhost:3001/dogs`);
        const dogs = allDogs.data;
            dispatch({type:GET_DOGS, payload: dogs})
        };
    };



export const getDog = (id) => {
    return async function (dispatch) {
        const IDDog = await axios.get(`http://localhost:3001/dogs/detail/${id}`);
        const dog = IDDog.data;
            dispatch({type:GET_DOG, payload: dog})
    };
};

export const getDogByName = (name, evento) => {
    return async function (dispatch) {
        evento(true)
        const dogByName = await axios.get(`http://localhost:3001/dogs?name=${name}`)
        const dogName = dogByName.data;
            dispatch({type:GET_DOGNAME, payload: dogName})
            evento(false)
    };
};

export const CleanDetail = () => {
    return function(dispatch){
        dispatch({type:CLEANDETAIL})
    }   
}