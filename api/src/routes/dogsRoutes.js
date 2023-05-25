const { Router } = require("express");
const router = Router();
// const { Dog, Temperament} = require("../db.js");
// const Sequelize = require ("sequelize");
const { getDogHandler, getDogsHandler, createDogHandler } = require("../handlers/dogsHandlers.js");
const { validate } = require("../middlewares/middlewares.js");


router.get("/", getDogsHandler); //busca todos los perros de API y DB y si se le pasa uno query filtra por query

router.get("/:id", getDogHandler); //busca por ID

router.post("/", createDogHandler)  //crea por body
 



module.exports = router; 