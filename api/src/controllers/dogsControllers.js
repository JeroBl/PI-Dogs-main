const { Dog, Temperament} = require("../db");
const axios = require("axios");
require("dotenv").config();
const { APIKEY } = process.env;




const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${APIKEY}`);
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

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = await apiInfo.concat(DbInfo);
    return infoTotal;
};


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllDogs,
}