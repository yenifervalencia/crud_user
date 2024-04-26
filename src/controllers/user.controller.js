const { getConnection } = require('./../database/database.js')

const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idPerson,cedula,nombre, telefono, edad, favorite_number FROM persons");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getFavoriteNumber = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT favorite_number FROM persons");
        const favoriteNumbers = result.map(item => item.favorite_number);
        let data=new Set(favoriteNumbers);
        res.json([...data]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT idPerson,cedula,nombre, telefono, edad, favorite_number FROM persons WHERE idPerson = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const { cedula,nombre, telefono, edad, favorite_number } = req.body;

        if (cedula === undefined || nombre === undefined || telefono === undefined|| edad === undefined|| favorite_number === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const person = { cedula,nombre, telefono, edad, favorite_number };
        const connection = await getConnection();
        await connection.query("INSERT INTO persons SET ?", person);
        res.json({ message: "persons added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula,nombre, telefono, edad, favorite_number} = req.body;

        if (cedula === undefined || nombre === undefined || telefono === undefined|| edad === undefined|| favorite_number === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const person = { cedula,nombre, telefono, edad, favorite_number };
        const connection = await getConnection();
        const result = await connection.query("UPDATE persons SET ? WHERE idPerson = ?", [person, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM persons WHERE idPerson = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

module.exports= {
    getUsers,
    getFavoriteNumber,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};