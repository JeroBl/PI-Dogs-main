import axios from "axios";

export const GET_DOGS = "GET_DOGS";
// export const GET_DOG = "GET_DOG";

export const getDogs = (evento) => {
    return async function(dispatch){
        evento(true)
        axios.get(`http://localhost:3001/dogs/home`)
        .then(res => res.data)
        .then(data => {
            dispatch({type:GET_DOGS, payload:data})
            evento(false);
        })
    }
};

// export const getDogs = () => {
//     return async function(dispatch){
//         const allDogs = await axios.get(`http://localhost:3001/dogs`);
//         const dogs = allDogs.data;
//             dispatch({type:GET_DOGS, payload:dogs})
//         }
//     };


// export const getDog = (id) => {

// }