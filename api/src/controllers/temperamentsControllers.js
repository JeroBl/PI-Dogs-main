const axios = require("axios");
require("dotenv").config();
const{ API, APIKEY} = process.env;
const { Temperament } = require("../db.js");

const getAllTemperaments = async (req,res) => {
    const temperamentsApi = await axios.get(`${API}?key=${APIKEY}`);
    const temperaments = temperamentsApi.data.map(e => e.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const findTemp = await Temperament.findAll();    
    return findTemp


}



module.exports = {
    getAllTemperaments
};