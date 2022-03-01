const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    score : {
        type : Number,
        required : true
    }
})

const Player = mongoose.model('PLAYER', playerSchema);

module.exports = Player;
