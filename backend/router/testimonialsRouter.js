const express = require('express')
const router = express.Router()
const {
    addTestimonials,
    deleteTestimonials,
    getAllTestimonials,
    updateTestimonials
}= require('../controller/testimonialsController.js')

router.get('/', getAllTestimonials);
router.post('/', addTestimonials);
router.put('/:id', updateTestimonials);
router.delete('/:id', deleteTestimonials);

module.exports = router