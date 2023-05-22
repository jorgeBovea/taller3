const jwt = require("jsonwebtoken");
const MovieList = require('../../models/movieList')
const User = require('../../models/users');
const { request } = require("../../app");

const showMovieList = async () =>  {
    const movieList = await MovieList.find({})
    return movieList
}

const showMovieListByUser = async (request) =>  {
    const payload = request.body
    const idUser = request.params.id
    const currentUser = await User.findOne({ '_id': idUser })
    if (currentUser) {
        const movieList = await MovieList.findOne({ 'owner': idUser })
        return movieList 
    }
    return {}
}


const addMovie = async (request) => {
    const payload = request.body
    const idUser = request.params.id
    const currentUser = await User.findOne({ '_id': idUser })

    if (currentUser) {
        const movieList = await MovieList.findOne({ 'owner': idUser })
        console.log("lista ", movieList)
        if (movieList) {
            console.log("agregando a la lista ")
                     
            movieList.movies.push(payload["movie"])
            console.log("agregando a la lista ",movieList)
           // movieList.save()

        } else {
            console.log("creando Lista ")
            const newMovielist = new MovieList()
            newMovielist.name = "defaul"
            newMovielist.owner = idUser
            newMovielist.nicknameUser = currentUser.nickname
            newMovielist.rating = 0
            newMovielist.movies = payload["movie"]
            
            console.log("antes: ",newMovielist)
            await newMovielist.save()
           
            return newMovielist
        }

    } else {
        throw new error('Usuario no encontrado.');
    }

}

module.exports = { addMovie,showMovieList,showMovieListByUser }