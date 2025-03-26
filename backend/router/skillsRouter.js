const express = require('express');
const router = express.Router();
const {
    createSkill,
    deleteSkill,
    getAllSkill,
    updateSkill
} = require('../controller/skillController.js');
const {
    createSkillValidator,
    updateSkillValidator
} = require('../validation/skillValidator.js');
router.get('/', getAllSkill);
router.post('/', createSkillValidator,createSkill);
router.put('/:id',updateSkillValidator, updateSkill);
router.delete('/:id', deleteSkill);


module.exports = router;