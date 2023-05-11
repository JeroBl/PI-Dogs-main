
const validate = (req, res, next) => {
    const { image,name,height,weight,life_span } = req.body; // middleware para validacion antes que lleguemos al post
    if(!image || !name || !height || !weight || !life_span)
    res.status(400).json({error:"Missing data"});
    next(); 
}

module.exports = {
    validate,
}