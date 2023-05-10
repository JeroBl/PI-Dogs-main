const { Router } = require("express");
const router = Router();
const { getAllTemperaments } = require("../controllers/temperamentsControllers");


router.get("/", async (req, res) => {
    const temperamentsApi = await getAllTemperaments();
    try {
        res.status(200).json(temperamentsApi)
    } catch (error) {
       res.status(404).json(error.message) 
    }
})





module.exports = router;