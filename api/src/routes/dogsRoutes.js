//  const { router } = require("../app");

const { Router } = require("express");
const router = Router();
const { Dog, Temperament} = require("../db.js");
const express = require("express");
const Sequelize = require ("sequelize");

const { getDogHandler, getDogsHandler, createDogHandler } = require("../handlers/dogsHandlers.js");



router.get("/", getDogsHandler);   //busca todos API y DB y si se le pasa una query filtra por query

router.get("/:id", getDogHandler); //busca por ID

router.post("/", createDogHandler)  //crea por body
 



module.exports = router;