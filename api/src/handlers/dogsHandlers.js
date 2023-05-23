const { getAllDogs, getDogByID } = require("../controllers/dogsControllers");
const { Dog, Temperament} = require("../db");



//Retorna todos los dogs si no se le pasa name por query, sino busca la query 

const getDogsHandler = async (req,res) =>{
    try {
        const name = req.query.name
        let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("No se encuentra la raza");
    } else{
        res.status(200).send(dogsTotal);
    }
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}


// Retorna el dog por ID

const getDogHandler = async (req,res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const dog = await getDogByID(id, source)
        res.status(200).json(dog)  
    } catch (error) {
        res.status(400).json(error.message);
    }
}


// Crea un dog por body

const createDogHandler = async (req,res) => {
    let {
        image,
        name,
        height,
        weight,
        life_span,
        createdInDb,
        temperaments  
    } = req.body;

    try {
        
        let dogCreated = await Dog.create({
            image,
            name,
            height,
            weight,
            life_span,
            createdInDb
        })
    
        let temperamentDB = await Temperament.findAll({
            where: { name: temperaments }
        })
    
        await dogCreated.addTemperament(temperamentDB)
        
        res.status(201).json({ message: "Dog creado con éxito" });
    
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    
};





module.exports = {
    getDogHandler,
    getDogsHandler,
    createDogHandler,
}