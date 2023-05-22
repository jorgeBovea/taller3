const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authorization');
const movieMethods = require('./methods')
router.use(authMiddleware);


router.get('/list/all', async (req, res) => {
    try {
        const listtMovie = await movieMethods.showMovieList()
        console.log(listtMovie)
        res.status(200).json({
            message: 'lista de peliculas',
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }

});

router.get('/list/:id', async (req, res) => {
    try {
        const listtMovie = await movieMethods.showMovieListByUser(req)
        res.status(200).json({
            message: 'lista de peliculas',
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }

});

router.post('/list/:id/add', (req, res) => {
    try {
        const listtMovie = movieMethods.addMovie(req)
        res.status(200).json({
            message: 'lista de usuario ' + listtMovie['owner'],
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }

});

router.delete('/list/:id/delete/:movie_id', (req, res) => {
    res.send("Endpoint para eliminar peliculas a una lista: ",
        JSON.stringify(req.params));
});

router.put('/list/:id/rate', (req, res) => {
    res.send("Endpoint para calificar listas de otros usuarios");
});

module.exports = router;
