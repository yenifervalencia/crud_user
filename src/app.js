const express=require ("express");
const morgan=require ("morgan");

/**
 * Call routes
 */
const usersRoutes=require ("./routes/users.routes.js");

const app = express();

/**
 * setting port express
 */
app.set("port", 4000);

app.use(morgan("dev"));
app.use(express.json());

/**
 * Basic routes
 */
app.use("/api/users", usersRoutes);

module.exports = app;