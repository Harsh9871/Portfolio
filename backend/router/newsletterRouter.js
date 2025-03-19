const express = require('express');
const router = express.Router();
const {
    addNewsletter,
    deleteNewsletter,
    getNewsletter
} = require('../controller/newsletterController.js');

router.get('/', getNewsletter);
router.post('/', addNewsletter);
router.delete('/:id', deleteNewsletter);


module.exports = router;