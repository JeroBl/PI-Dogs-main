import { GET_DOGS, GET_DOG } from "./actions";

const initialState = {
    dogs: [],
    dog: null,
};


const rootReducer = (state = initialState, action)  =>{
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload 
            };
        case GET_DOG:
            return {
                ...state,
                dog: action.payload
            };
        default:
            return {...state};
    }
}

export default rootReducer;