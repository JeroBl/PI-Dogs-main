//  const { router } = require("../app");
const { Router } = require("express");
const router = Router();
const { Dog, Temperament} = require("../db.js");
// const express = require("express");
const Sequelize = require ("sequelize");
const { getDogHandler, getDogsHandler, createDogHandler, getDogByNameHandler } = require("../handlers/dogsHandlers.js");
const { validate } = require("../middlewares/middlewares.js");

// router.get("/name", getDogsHandler); //busca por query

router.get("/", getDogsHandler);   //busca todos API y DB y si se le pasa una query filtra por query

router.get("/detail/:id", getDogHandler); //busca por ID

router.post("/", validate, createDogHandler)  //crea por body
 



module.exports = router;