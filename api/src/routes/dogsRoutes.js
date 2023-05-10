//  const { router } = require("../app");
const { getAllDogs } = require("../controllers/dogsControllers.js");

const { Router } = require("express");
const router = Router();

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





module.exports = router;