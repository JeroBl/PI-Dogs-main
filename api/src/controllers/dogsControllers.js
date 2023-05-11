const { Dog, Temperament} = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API, APIKEY } = process.env;



//dogs de API
const getApiInfo = async () => {
    const apiUrl = await axios.get(`${API}?key=${APIKEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            image: el.image,
            height: el.height,
            weight: el.weight,
            life_span: el.life_span,
            id: el.id,
        };
    });
    return apiInfo
};


//dogs de DB
const getDbInfo = async () => {
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes:[],
            }
        }
    })
}

//dogs de DB + API
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = await DbInfo.concat(apiInfo);
    return infoTotal;
};


//dog por ID
const getDogByID = async (id) => {
    if(isNaN(id)){
        return await getDogByPK(id)
    }
    return axios.get(`${API}/${id}?key=${APIKEY}`)
    .then(res => res.data)
    .catch(error => {
        throw new Error(error.message);
    });
}


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllDogs,
    getDogByID
}