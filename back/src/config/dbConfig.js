require("dotenv").config();

const mongoose = require("mongoose");

const dbConfig = async () => {
    //realizar conexion con la base de datos
    await mongoose.connect(process.env.MONGO_URI);
};

module.exports = dbConfig;
