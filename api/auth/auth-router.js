const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken')
const { JWT_SECRET } = require("../secrets");
const Users = require('../auth/auth-model')


router.get('/test', async (req, res, next) => {
    try{
        res.status(200).json({message: "auth-router is functioning correctly"})
    }
    catch(err){
        next(err)
    }
} )

//[POST] /register adds and returns a new user
router.post('/register', (req,res,next) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    Users.addUser(user)
        .then(u => {
            res.status(201).json(u)
        })
        .catch(next)
})

//[POST] /login logs in to user using username and password 
// returns with a web token and user_id
// you will want to use the returned user_id and token to make sure this user only has access to
// their respective stores, and not the stores of others
router.post('/login', (req, res ,next) => {
    const {username, password} = req.body;
    Users.findUser({username: username})
            .then((user) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = makeToken(user)
                    res.status(200).json({
                        message: `${user.username} has logged in.`,
                        token: token
                    })
                }
                else {
                    res.status(401).json({message: "Invalid credentials"})
                }
            })
            .catch(next)
        
})


//Function to create authorization token
function makeToken(user){
    const payload = {
      subject: user.user_id,
      username: user.username,
      role_id: user.role_id
    }
    const options = {
      expiresIn: "1d"
    }
    return jwt.sign(payload,JWT_SECRET,options)
  }

module.exports = router;