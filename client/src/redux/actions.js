import axios from 'axios';

export const GET_DOGS = "GET_DOGS";
export const GET_DOG = "GET_DOG";
export const GET_DOGNAME = "GET_DOGNAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const CLEANDETAIL = "CLEANDETAIL";
export const CREATEDOG = "CREATEDOG";
export const ORDER_ALFABETIC = "ORDER_ALFABETIC";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";   
export const RESET_FILTERS = "RESET_FILTERS";


export const getDogs = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/dogs");
        const dogs = response.data;
  
        dispatch({
          type: GET_DOGS,
          payload: dogs,
        });
  
        dispatch(getTemperaments());
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  export const getTemperaments = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/temperaments");
        const temperaments = response.data;
  
        dispatch({
          type: GET_TEMPERAMENTS,
          payload: temperaments,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };



export const getDog = (id) => {
    return async function (dispatch) {
        const IDDog = await axios.get(`http://localhost:3001/dogs/detail/${id}`);
        const dog = IDDog.data;
            dispatch({type:GET_DOG, payload: dog})
    };
};



export const getDogName = (payload) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            if (json.data)
            return dispatch ({type: GET_DOGNAME, payload: json.data})
        } catch (error) {
            return  alert(`No se encontro el perro`)
        }
    }
};

export const createDog = (payload) => {
    return async function (dispatch) {
        const create = await axios.post(`http://localhost:3001/dogs`, payload);
        dispatch({ type: CREATEDOG });
    return create.data;
    }
};

export const orderAlfabetic = (payload) => {
    return async function(dispatch) {
        dispatch({ type:ORDER_ALFABETIC, payload })
    }
};

export const orderWeight = (payload) => {
    return async function(dispatch) {
        dispatch({  type:ORDER_WEIGHT, payload })
    }
}

export const filterByOrigin = (origin) => {
    return {
      type: FILTER_BY_ORIGIN,
      payload: origin,
    };
  };

export const filterByTemperament = (payload) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: payload,
    }
}

export const CleanDetail = () => {
    return function(dispatch){
        dispatch({ type: CLEANDETAIL })
    }   
};


export const resetFilters = () => {
    return {
      type: "RESET_FILTERS",
    };
  };
   
