const router = require('express').Router();
const {
    register,
    login,
    logout
}  = require('../Controllers/auth')
router
    .route('/register')
    .post(register)

router
    .route('/login')
    .post(login)

router
    .route('/')
    .get(logout)
    
module.exports = router