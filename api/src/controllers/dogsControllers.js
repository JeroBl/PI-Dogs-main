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
            temperament:el.temperament,
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

const getDogByID = async (id, source) => {
    const dog = 
        source === "api"
            ? (await axios.get(`${API}/${id}?key=${APIKEY}`)).data
            : await Dog.findByPk(id);

    return dog;
}

//dog por name

const getDogByName = async (name) => {
    const array = [];
    const response = await axios.get(`${APIRAZA}?key=${APIKEY}&search=${name}`);
    response.data.forEach((el) => {
        const { name, image, height, weight, life_span, id, temperament } = el;
        array.push({
            name: name,
            image: image,
            height: height,
            weight: weight,
            life_span: life_span,
            id: id,
            temperament: temperament,
        });
    });
    return array;
};





module.exports = {
    getApiInfo,
    getDbInfo,
    getAllDogs,
    getDogByID,
    getDogByName,
}

            