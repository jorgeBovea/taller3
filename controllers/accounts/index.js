const express = require('express');
const router = express.Router();
const accountsMethods = require('./methods');

router.post('/register', async (req, res) => {
    try {
        const user = await accountsMethods.registerUser(req.body);
        res.status(200).json({
            message: 'Usuario registrado exitosamente.',
            data: user
        });
    }catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login',async (req, res) => {
    
    const {user, password} = req.body;
    
    try {
        console.log(user,password)
        const accessToken = await accountsMethods.loginUser(user, password);
        if (!accessToken) throw new error('Token inválido.');
        res.status(200).json(accessToken);
    }catch (error) {
        console.log(error.message)
        res.status(404)
        .send("Nombre de usuario o contraseña incorrecta.");
    }
       
});

module.exports = router;