const express = require('express');
const router = express.Router();
const myController = require('../Controller/fileController'); 

router.get('/read-file', myController.getFile); 

module.exports = router;
