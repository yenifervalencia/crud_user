const mysql =require("promise-mysql");
const config =require ("./../config");

/**
 * create connection by database with environmenet variable
 */
const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});

/**
 * function content connection
 * @returns 
 */
const getConnection = () => {
    return connection;
};

/**
 * export function
 */
module.exports = {
    getConnection
};