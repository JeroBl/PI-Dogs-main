import {
  GET_DOGS,
  GET_DOG,
  GET_DOGNAME,
  CLEANDETAIL,
  CREATEDOG,
  ORDER_ALFABETIC,
  ORDER_WEIGHT,
  FILTER_BY_ORIGIN,
  RESET_FILTERS,
  FILTER_BY_TEMPERAMENT,
  GET_TEMPERAMENTS,
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dog: null,
  dogName: null,
  temperamentFilter: null,
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_DOG:
      return {
        ...state,
        dog: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_DOGNAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case CLEANDETAIL:
      return {
        ...state,
        dogName: null,
      };
    case CREATEDOG:
      return {
        ...state,
      };
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
          const [minA, maxA] = a.weight.split("-").map(Number);
          weightA = (minA + maxA) / 2;
        } else {
          const [minA, maxA] = a.weight.metric.split("-").map(Number);
          weightA = (minA + maxA) / 2;
        }

        if (b.createdInDb) {
          const [minB, maxB] = b.weight.split("-").map(Number);
          weightB = (minB + maxB) / 2;
        } else {
          const [minB, maxB] = b.weight.metric.split("-").map(Number);
          weightB = (minB + maxB) / 2;
        }

        return action.payload === "asc" ? weightA - weightB : weightB - weightA;
      });

      return {
        ...state,
        dogs: sortedWeight,
      };
    case FILTER_BY_ORIGIN:
      const filteredDogs = state.allDogs.filter((dog) => {
        if (action.payload === "DB") {
          return dog.createdInDb;
        } else if (action.payload === "API") {
          return !dog.createdInDb;
        }
        return true;
      });
      return {
        ...state,
        dogs: filteredDogs,
      };
      case FILTER_BY_TEMPERAMENT:
  const selectedTemperament = action.payload;
  if (selectedTemperament === "") {
    return {
      ...state,
      dogs: state.allDogs,
      temperamentFilter: null,
    };
  } else {
    const filteredByTemperament = state.allDogs.filter((dog) =>
      (dog.temperament && dog.temperament.includes(selectedTemperament)) ||
      (dog.temperaments && dog.temperaments.some((temp) => temp.name === selectedTemperament))
    );
    return {
      ...state,
      dogs: filteredByTemperament,
      temperamentFilter: selectedTemperament,
    };
  }

      
    case RESET_FILTERS:
      return {
        ...state,
        dogs: state.allDogs,
        temperamentFilter: null,
      };
    default:
      return state;
  }
};

export default rootReducer;