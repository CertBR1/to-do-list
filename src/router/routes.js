const express = require('express');
const router = express();
const { verifyBody, validateId } = require('../middleware/middleware');
const { getLista, setTarefa, getListById, editTarefa } = require('../controller/listController');

router.get('/lista', getLista);
router.post('/lista', verifyBody, setTarefa);
router.get('/lista/:id', validateId, getListById);
router.patch('/lista/:id', validateId, verifyBody, editTarefa)
module.exports = router;