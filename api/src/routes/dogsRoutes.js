//  const { router } = require("../app");
const { getAllDogs } = require("../controllers/dogsControllers.js");
const { Router } = require("express");
const router = Router();
const { Dog, Temperament} = require("../db.js");
const express = require("express");
const Sequelize = require ("sequelize");

//ruta que retorna todos los dogs si no se le pasa nada por query, sino busca la query 
router.get("/", async (req,res) =>{
    try {
        const name = req.query.name
        let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName) :
        res.status(404).send("no se encuentra la raza");
    } else{
        res.status(200).send(dogsTotal);
    }
    } catch (error) {
        res.status(500).json(error.message);
    }
    
})

// router.post("/temperaments", async (req,res) => {
//     let {
//         image,
//         name,
//         height,
//         weight,
//         life_span,
//         createdInDb,
//         temperaments  // aquí el cambio de nombre
//     } = req.body;

//     let dogCreated = await Dog.create({
//         image,
//         name,
//         height,
//         weight,
//         life_span,
//         createdInDb
//     })

//     let temperamentDB = await Temperament.findAll({
//         where: { name: temperaments } // aquí también
//     })

//     dogCreated.addTemperament(temperamentDB)
//     res.status(200).send("Dog creado con exito")

// });


router.get("/:id", async (req,res) => {
    try {
        const id = req.params.id;
    const totalDogs = await getAllDogs();
    if(id){
        let dogId = await totalDogs.filter(el => el.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send("No encotre el Dog")
    }
    } catch (error) {
        res.status(500).json(error.message);
    }
})






module.exports = router;