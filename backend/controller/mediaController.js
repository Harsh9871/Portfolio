const fs = require('fs');
const path = require('path');

// @desc Get Media File by filename
// @route GET /api/media/:filename
exports.getMedia = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../assets', filename);

        // Check if file exists
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc Upload media
// @route POST /api/media
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Rename the uploaded file to current timestamp + extension
        const ext = path.extname(req.file.originalname);
        const newFileName = `${Date.now()}${ext}`;
        const oldPath = req.file.path;
        const newPath = path.join(req.file.destination, newFileName);

        fs.renameSync(oldPath, newPath);

        // Respond with the URL to access the file
        const fileUrl = `http://localhost:5001/api/media/${newFileName}`;
        res.status(201).json({ success: true, url: fileUrl });
    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc Delete media
// @route DELETE /api/media/:filename
exports.deleteMedia = async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../assets', filename);

        // Check if file exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ success: true, message: 'File deleted successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
