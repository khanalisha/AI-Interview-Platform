const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.Mongoose);

module.exports = {
    connection
}