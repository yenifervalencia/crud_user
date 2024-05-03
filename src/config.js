const { config }=require("dotenv");

config();

/**
 * call environmenet variable 
 */
module.exports = {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
};