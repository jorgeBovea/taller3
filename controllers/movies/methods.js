const jwt = require("jsonwebtoken");
const MovieList = require('../../models/movieList')
const User = require('../../models/users');
const { request } = require("../../app");


//Metodo para califcar listas 
const rateList = async (request) => {
    const payload = request.body
    const idUser = request.params.id
    const rate = payload["rate"]
    const currentUser = await User.findOne({ '_id': idUser })
    console.log("encontr user")
    if (currentUser) {
        console.log("encontr user")
        const movieList = await MovieList.findOne({ 'owner': idUser })
        if (movieList) {
            

            await MovieList.findByIdAndUpdate(movieList.id,
                { "rating": rate },
                { new: true }
            )

            const movieListnew = await MovieList.findOne({ 'owner': idUser })
            console.log(movieListnew)
            return movieListnew
        } else {

            throw new error('lista no encontrada.');

        }
    }
    throw new error('usuario no encontrado.');
}

//Metodo muestra todas las listas disponibles

const showMovieList = async () => {
    const movieList = await MovieList.find({})
    return movieList
}

//Metodo muestra lista disponibles para un usuario

const showMovieListByUser = async (request) => {
    const payload = request.body
    const idUser = request.params.id
    const currentUser = await User.findOne({ '_id': idUser })
    if (currentUser) {
        const movieList = await MovieList.findOne({ 'owner': idUser })
        return movieList
    }
    throw new error('usuario no encontrado.');
}

//Metodo elimina la lista de un usuario
const deleteMovie = async (request) => {

    const payload = request.body
    const idUser = request.params.id
    const idMovie = request.params.movie_id
    const currentUser = await User.findOne({ '_id': idUser })


    if (currentUser) {
        const movieList = await MovieList.findOne({ 'owner': idUser })
        if (movieList) {

            await MovieList.findByIdAndUpdate(movieList.id,
                { $pull: { movies: { _id: idMovie } } },
                { new: true }
            )
            const movieListNew = await MovieList.findOne({ 'owner': idUser })
            return movieListNew
        } else {
            throw new error('Usuario no tiene listas.');
        }

    } else {
        throw new error('Usuario no encontrado.');
    }
}

//Metodo agrega una pelicula a la lista del usuario, si no posee listas creara una nueva
const addMovie = async (request) => {
    const payload = request.body
    const idUser = request.params.id
    const currentUser = await User.findOne({ '_id': idUser })
    const movie = payload["movie"]
    if (currentUser) {
        const movieList = await MovieList.findOne({ 'owner': idUser })
        console.log("lista ", movieList)
        if (movieList) {

            await MovieList.findByIdAndUpdate(movieList.id,
                { $push: { movies: movie } },
                { new: true }
            )

            const movieListNew = await MovieList.findOne({ 'owner': idUser })
            return movieListNew
        } else {
            const newMovielist = new MovieList()
            newMovielist.name = "defaul"
            newMovielist.owner = idUser
            newMovielist.nicknameUser = currentUser.nickname
            newMovielist.rating = 0
            newMovielist.movies = payload["movie"]

            await newMovielist.save()

            return newMovielist
        }

    } else {
        throw new error('Usuario no encontrado.');
    }

}

//Metodo para crear Lista

const createList = async (request) => {
    const payload = request.body
    const idUser = request.params.id
    const currentUser = await User.findOne({ '_id': idUser })

    if (currentUser) {
        const movieListOld = await MovieList.findOne({ 'owner': idUser })
        console.log("lista ", movieList)
        if (movieListOld) {
            throw new error('Usuario ya posee una lista.');
        }
        const movielist = new MovieList(payload)
        await movielist.save()
        return movieList

    } else {
        throw new error('Usuario no encontrado.');

    }
}

module.exports = { addMovie, showMovieList, showMovieListByUser, deleteMovie, createList, rateList }