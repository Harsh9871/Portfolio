const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getMedia,
    uploadMedia,
    deleteMedia
} = require('../controller/mediaController.js');

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets')); // Save in ../assets
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Keep file extension
    }
});
const upload = multer({ storage });

// Routes
router.get('/:filename', getMedia);                          // Serve file
router.post('/', upload.single('file'), uploadMedia);        // Upload file
router.delete('/:id', deleteMedia);                          // Delete from DB and assets

module.exports = router;
