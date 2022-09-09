const {error} = require("console");
const mysql = require("mysql");

const mysqlConnection = {
    init : function () {
        
        return mysql.createConnection({
            host: process.env.host,
            port: process.env.port,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });
    }, 

    open : function(connection) {
        connection.connect(error => {
            if (error) {
               console.log("❌Failed to Connect DB", error);
           }
           console.log("⭕ DB Connected Successfully!")
        });
    },

    close : function(connection){
        connection.end(error => {
            if (error) {
                console.log("❌Failed to End DB", error);
            }
            console.log("⭕ DB End Successfully!");
        });
    }
}

module.exports = mysqlConnection;
