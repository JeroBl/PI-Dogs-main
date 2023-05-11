const { getAllTemperaments } = require("../controllers/temperamentsControllers");
const { Dog, Temperament} = require("../db");


const getTemperamentsHandler = async (req, res) => {
    const temperamentsApi = await getAllTemperaments();
    try {
        res.status(200).json(temperamentsApi)
    } catch (error) {
       res.status(404).json(error.message) 
    }
}


module.exports = {
    getTemperamentsHandler,
}