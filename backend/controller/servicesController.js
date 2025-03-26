const Service = require("../model/services.js");

// @desc    Get all services
// @route   GET /api/services/
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create service
// @route   POST /api/services/
exports.createServices = async (req, res) => {
    const { name, description, keyPoints, svg } = req.body;
    try {
        const newService = new Service({ name, description, keyPoints, svg });
        await newService.save();
        res.status(201).json({ success: true, message: "Service created successfully", data: newService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
exports.updateServices = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, message: "Service updated successfully", data: updatedService });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
exports.deleteServices = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }
        res.status(200).json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
