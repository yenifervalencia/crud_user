const { getConnection } = require('./../database/database.js')

/**
 * Get all persons :V
 * @param {*} res 
 */
const getUsers = async (res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT idPerson,cedula,nombre, telefono, edad, favorite_number FROM persons");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/**
 * Get favorite number without duplicate
 * @param {*} res 
 */
const getFavoriteNumber = async (res) => {
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

/**
 * get person by id
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Create person
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addUser = async (req, res) => {
    try {
        const { cedula,nombre, telefono, edad, favorite_number } = req.body;

        if (cedula === undefined || nombre === undefined || telefono === undefined|| edad === undefined|| favorite_number === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();

        const existing = await connection.query("SELECT * FROM persons WHERE cedula = ?", cedula);
        if (existing.length > 0) {
            return res.status(303).json({ message: "Ya existe una persona con este documento" });
        }

        const person = { cedula,nombre, telefono, edad, favorite_number };
        await connection.query("INSERT INTO persons SET ?", person);
        res.json({ message: "Se creo correctamente la persona" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/**
 * uddate person with id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { cedula,nombre, telefono, edad, favorite_number} = req.body;

        if (cedula === undefined || nombre === undefined || telefono === undefined|| edad === undefined|| favorite_number === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        const connection = await getConnection();
        const sql = "SELECT * FROM persons WHERE cedula = ? AND idPerson != ?";
           
        const params = [cedula, id];
        const existing = await connection.query(sql, params);
        console.log(existing)
        if (existing.length > 0) {
            return res.status(303).json({ message: "Ya existe una persona con este documento" });
        }

        const person = { cedula,nombre, telefono, edad, favorite_number };
        
        const result = await connection.query("UPDATE persons SET ? WHERE idPerson = ?", [person, id]);
        res.json({ message: "Se edito correctamente la persona" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/**
 * delete person
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM persons WHERE idPerson = ?", id);
        res.json({ message: "Se elimino correctamente la persona" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


/**
 * export functions
 */
module.exports= {
    getUsers,
    getFavoriteNumber,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};