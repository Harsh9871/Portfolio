const Testimonials = require('../model/testimonials.js');

// @desc    Get all testimonials
// @route   GET /api/testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.find();
        res.status(200).json(testimonials);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc    Add a new testimonial
// @route   POST /api/testimonials
exports.addTestimonials = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const testimonial = new Testimonials({ name, description, image });
        await testimonial.save();

        res.status(201).json(testimonial);
    } catch (err) {
        res.status(400).json({ message: "Failed to add testimonial", error: err.message });
    }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
exports.updateTestimonials = async (req, res) => {
    try {
        const updatedTestimonial = await Testimonials.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedTestimonial) return res.status(404).json({ message: "Testimonial not found" });

        res.status(200).json(updatedTestimonial);
    } catch (err) {
        res.status(400).json({ message: "Failed to update testimonial", error: err.message });
    }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
exports.deleteTestimonials = async (req, res) => {
    try {
        const deletedTestimonial = await Testimonials.findByIdAndDelete(req.params.id);

        if (!deletedTestimonial) return res.status(404).json({ message: "Testimonial not found" });

        res.status(200).json({ message: "Testimonial deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete testimonial", error: err.message });
    }
};
