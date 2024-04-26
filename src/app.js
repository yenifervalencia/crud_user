const express=require ("express");
const morgan=require ("morgan");
// Routes
const usersRoutes=require ("./routes/users.routes.js");

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);

module.exports = app;
// var mysql= require('mysql');

// var conexion= mysql.createConnection({
//     host: 'localhost',
//     database: 'users',
//     user: 'root',
//     password: ''
// })

// conexion.connect(function (error){
//     if (error) {
//         throw error;
//     } else {
//         console.log('conexion exitosa')
//     }
// })
// conexion.query('SELECT * from persons', function(error,result){
//     if (error) {
//         throw error;
//     } else {
//         console.log('hola')
//         result.forEach(element => {
//             console.log(element)
//         });
//     }
// })
// conexion.end();