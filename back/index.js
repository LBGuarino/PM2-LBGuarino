const app = require("./src/server");
const dbConfig = require("./src/config/dbConfig");


dbConfig().then(
    res => {
        app.listen(3000, () => {
            console.log("Servidor escuchando en el puerto 3000");

        });
    });

