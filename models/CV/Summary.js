const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({

    Summary: {
        type: String
    }
})

const Summary = mongoose.model("Summary", summarySchema);
module.exports = { Summary, summarySchema};