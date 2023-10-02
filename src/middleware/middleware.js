const fs = require('fs/promises');
const verifyBody = (req, res, next) => {
    const { title, completed } = req.body;
    console.log(!title, completed)
    if (!title) res.status(400).json({ "mensagem": "É necessario ter um titulo!" });
    next();
};

const validateId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).json({ "mensagem": "Id inválido" });
        }
        const dataBuffer = await fs.readFile('src/db/db.json');
        const data = JSON.parse(dataBuffer.toString());
        const idToVerify = data.find(e => e.id === Number(id));
        if (!idToVerify) {
            return res.status(404).json({ "mensagem": "Usuario não encontrado" });
        }
        return next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).send();
    }
};

module.exports = {
    verifyBody,
    validateId
};  