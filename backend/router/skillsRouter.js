const express = require('express');
const router = express.Router();
const {
    createSkill,
    deleteSkill,
    getAllSkill,
    updateSkill
} = require('../controller/skillController.js');

router.get('/', getAllSkill);
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.put('/:id', deleteSkill);


module.exports = router;