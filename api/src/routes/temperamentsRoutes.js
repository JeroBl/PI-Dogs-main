const { Router } = require("express");
const router = Router();
const { getTemperamentsHandler } = require("../handlers/temperamentsHandlers");


router.get("/", getTemperamentsHandler);





module.exports = router;