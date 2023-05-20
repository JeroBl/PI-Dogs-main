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


// const getDbInfo = async () => {
//     let dogDB = await Dog.findAll({
//         include:{
//             model: Temperament,
//             attributes: ["name"],
//             through: {
//                 attributes:[],
//             }
//         }
//     })


// const temperamentDB = dogDB.map((el) => {
//     return {
//         id: el.id,
//         name: el.name,
//         image: el.image,
//         height: el.height,
//         weight: el.weight,
//         life_span: el.life_span,
//         createdInDb: true,
//         temperament:el.temperament?.map(temperament => temperament.name),
//     };
// });
// return temperamentDB
// }



const getDbInfo = async () => {
    let dogDB = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes:[],
            }
        }
    })

return dogDB
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



module.exports = {
    getApiInfo,
    getDbInfo,
    getAllDogs,
    getDogByID,
}

            