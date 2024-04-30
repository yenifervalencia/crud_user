const app= require("./app.js");

/**
 * Init express
 */
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main();