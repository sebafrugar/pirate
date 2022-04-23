const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Nombre obligatorio"],
        },
        image: {
            type: String,
            required: [true, "Imagen obligatoria"],
        },
        treasures: {
            type: Number,
            required: [true, "Se requiere numero de tesoros"],
        },
        frase: {
            type: String,
            required: [true, "Barco al cual pertenece"],
        },
        role: {
            type: String,
            required: [true, "Cargo obligatorio"],
        },
        skill1: {
            type: Boolean
        },
        skill2: {
            type: Boolean
        },
        skill3: {
            type: Boolean
        },
          
    },{ timestamps: true }
);

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = {PirateSchema, Pirate };