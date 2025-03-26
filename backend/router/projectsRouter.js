const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
} = require('../controller/projectController.js');
const {
    validateCreateProject,
    validateProjectById,
    validateProjectBySlug
} = require('../validation/projectValidator.js');
router.get('/', getAllProjects);
router.post('/',  validateCreateProject, createProject);
router.get('/:slug', validateProjectBySlug, getProjectBySlug);
router.put('/:id',  validateProjectById, updateProject);
router.delete('/:id',  validateProjectById, deleteProject);


module.exports = router;