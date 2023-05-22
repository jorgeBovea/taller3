const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authorization');
const movieMethods = require('./methods')
router.use(authMiddleware);

router.post('/list/:id/createlist', async (req, res) => {
    try {
        const listtMovie =await movieMethods.createList(req)
        res.status(200).json({
            message: 'lista de usuario ' + listtMovie['owner']+ " Actualizada",
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }

});



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

router.post('/list/:id/add', async (req, res) => {
    try {
        const listtMovie = await movieMethods.addMovie(req)
        res.status(200).json({
            message: 'lista de usuario ' + listtMovie['owner']+ " Actualizada",
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }

});

router.delete('/list/:id/delete/:movie_id', async (req, res) => {
    try {
        const listtMovie =  await movieMethods.deleteMovie(req)

        res.status(200).json({
            message: 'lista de usuario Actualizada',
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/list/:id/rate', async (req, res) => {
    try {
        const listtMovie =  await movieMethods.rateList(req)

        res.status(200).json({
            message: 'lista de usuario Actualizada',
            data: listtMovie
        });

    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;
