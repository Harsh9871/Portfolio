const express = require('express');
const router = express.Router();
const {
    createServices,
    deleteServices,
    getAllServices,
    updateServices
} = require('../controller/servicesController.js');
const {
    validateCreateService,
    validateServicesById
} = require('../validation/serviceValidator.js');

router.get('/', getAllServices);
router.post('/',validateCreateService, createServices);
router.put('/:id',validateServicesById, updateServices);
router.delete('/:id',validateServicesById, deleteServices);


module.exports = router;