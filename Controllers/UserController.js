const db = require("../database/database");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
    let sql;
    if (req.params.id) {
        sql = `SELECT * FROM users WHERE id= '${req.params.id}'`;
    } else {
        sql = "SELECT * FROM users";
    }
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
};

const createUsers = (req, res) => {
    console.log(req.body);
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const fullName = req.body.fullName;

    if (role !== undefined) {
        if (role >= 2 && role < 0) {
            res.status(500).json({
                message: "Role id can't be more than number 2",
            });
            return;
        }
    } else {
        res.status(500).json({ message: "Role id can't be empty" });
        return;
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        res.status(500).json({ message: "Email is not valid" });
        return;
    }

    const sql = `INSERT INTO users (roleId, email, password, fullName) VALUES ("${role}", "${email}", "${password}", "${fullName}")`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ message: "User created successfully!" });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const role = req.body.role;

    const sql = `UPDATE users SET roleId = '${role}' WHERE (id = '${userId}')`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ message: "User has been updated successfully!" });
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM users WHERE (id = '${id}')`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ message: "User has been deleted successfully!" });
    });
};

const userLogin = (req, res) => {
    let sql = `SELECT * FROM users WHERE email= '${req.body.email}'`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        let data = JSON.parse(JSON.stringify(result))[0];
        if (data.password !== req.body.password) {
            res.status(400).send("Check your credentials");
            return;
        }
        delete data.password;
        const token = jwt.sign(data, "SuperSecretKey!", { expiresIn: "1h" });
        res.status(200).send({ userDetails: data, token });
    });
};

module.exports = { getUsers, createUsers, updateUser, deleteUser, userLogin };
