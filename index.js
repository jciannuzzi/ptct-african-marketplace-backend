const server = require ('./api/server.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

server.get('/', async (req,res,next) => {
    try{
        res.status(200).json({message: "Base endpoint fucntioning correctly"})
    }
    catch(err){
        next(err);
    }
})