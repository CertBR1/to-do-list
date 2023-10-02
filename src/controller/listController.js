const fs = require('fs/promises');

const getLista = async (req, res) => {
    try {
        const data = await fs.promises.readFile('src/db/db.json');
        return res.json(JSON.parse(data));
    } catch (err) {
        console.log('get lista', err.message);
        return res.status(500).send();
    }
};
const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        const dataBuffer = await fs.readFile('src/db/db.json');
        const data = JSON.parse(dataBuffer.toString());
        const tarefa = data.find(e => e.id === Number(id));
        return res.json(tarefa);
    } catch (err) {
        console.log('get list by id', err.message);
        return res.status(500).send();
    };
};
const setTarefa = async (req, res) => {
    try {
        const data = require('src/db/db.json');
        const { title, completed = false, description = "Sem descrição" } = req.body;
        const newTarefa = {
            id: data.length + 1,
            title,
            completed,
            description,
        };
        data.push(newTarefa);
        await fs.writeFile('./src/db/db.json', JSON.stringify(data));
        return res.status(201).json(newTarefa);
    } catch (err) {
        console.log('set tarefa', err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const editTarefa = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const dataBuffer = await fs.readFile('src/db/db.json');
        const data = JSON.parse(dataBuffer);
        const index = data.findIndex(e => e.id === Number(id));
        data[index].completed = completed ?? data[index].completed;
        data[index].title = title ?? data[index].title;
        data[index].description = description ?? data[index].description;
        await fs.writeFile('src/db/db.json', JSON.stringify(data));
        return res.status(201).json(data[index]);
    } catch (err) {
        console.log('edit tarefa', err.mensage);
        return res.status(500)
    }
};

module.exports = {
    getLista,
    setTarefa,
    getListById,
    editTarefa,
}