import { GET_DOGS, GET_DOG, GET_DOGNAME, CLEANDETAIL } from "./actions";

const initialState = {
    dogs: [],
    dog: null,
    dogName: null,
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
        case GET_DOGNAME:
            return {
                ...state,
                dogName: action.payload
            }
        case CLEANDETAIL:
            return{
                ...state,
                dogName:null
                }
        default:
            return {...state};
    }
}

export default rootReducer;