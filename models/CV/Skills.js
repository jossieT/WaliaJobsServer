const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({

    skills: {
        type: String
    }
})

const Skills = mongoose.model("Skills", skillSchema);
module.exports = Skills;