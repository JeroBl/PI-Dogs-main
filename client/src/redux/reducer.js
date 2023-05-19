import { GET_DOGS, GET_DOG, GET_DOGNAME, CLEANDETAIL, CREATEDOG, ORDER_ALFABETIC, ORDER_WEIGHT } from "./actions";

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
                dogs: action.payload
            }
        case CLEANDETAIL:
            return{
                ...state,
                dogName:null
                }
        case CREATEDOG:
            return{
                ...state,
            }
        case ORDER_ALFABETIC:
                const sortedName = state.dogs.slice().sort((a, b) => {
                  return action.payload === "A-Z"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
                });
              
                return {
                  ...state,
                  dogs: sortedName,
                };
        case ORDER_WEIGHT:
                    const sortedWeight = state.dogs.slice().sort((a, b) => {
                      let weightA, weightB;
                      
                      if (a.createdInDb) {
                        const [minA, maxA] = a.weight.split('-').map(Number);
                        weightA = (minA + maxA) / 2;
                      } else {
                        const [minA, maxA] = a.weight.metric.split('-').map(Number);
                        weightA = (minA + maxA) / 2;
                      }
                      
                      if (b.createdInDb) {
                        const [minB, maxB] = b.weight.split('-').map(Number);
                        weightB = (minB + maxB) / 2;
                      } else {
                        const [minB, maxB] = b.weight.metric.split('-').map(Number);
                        weightB = (minB + maxB) / 2;
                      }
                      
                      return action.payload === 'asc' ? weightA - weightB : weightB - weightA;
                    });
                    
                    return {
                      ...state,
                      dogs: sortedWeight,
                  };
        
                  
        default:
            return {...state};
    }
}

export default rootReducer;