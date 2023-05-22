const { Schema, model } = require('mongoose');
const { compare, genSalt, hash } = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar el correo electrónico.']
    },
    name: {
        type: String,
        required: [true, 'Debe ingresar su nombre completo']
    },
    nickname: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar un nickname']
    },
    birthdate: {
        type: Date,
        required: [true, 'Debe ingresar su fecha de nacimiento']
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar su contraseña']
    }
},
{
    timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' }
});

userSchema.pre('save', async function(next) {
    
	//si el password no se modifica no haremos nada
	if (!this.isModified('password')) return next();
		
	const salt = await genSalt(+process.env.SALTING_ROUNDS);
	this.password = await hash(this.password, salt);
	next();
    
    
});

userSchema.methods.comparePassword = async function(plainText) {
    return await compare(plainText, this.password);
}

const User = model('User', userSchema);
module.exports = User;