const { Schema, model } = require('mongoose');
//por defecto mongoose añade una propiedad _id con tipo ObjectId
//cada vez que ingresa un nuevo documento un _id nuevo es generado.
const movieListSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debe ingresar el nombre de la lista de peliculas']
    },
    owner: {
        type: String,
        require: [true, 'El nickname del usuario es obligatorio.']
    },
    nickname:{
        type: String
    },
    rating: {
        type: Number,
        default: 5,
        require: [true, 'Debe ingresar la calificación de la lista']
    },
    movies: [{ name: String, year: Number, image: String }]
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' }
});

/**
 * construimos finalmente el modelo a partir del eschema definido.
 */
const movieList = model('MovieList', movieListSchema);
module.exports = movieList;