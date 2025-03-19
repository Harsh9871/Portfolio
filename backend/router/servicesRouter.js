const express = require('express');
const router = express.Router();
const {
    createServices,
    deleteServices,
    getAllServices,
    updateServices
} = require('../controller/servicesController.js');

router.get('/', getAllServices);
router.post('/', createServices);
router.put('/:id', updateServices);
router.put('/:id', deleteServices);


module.exports = router;