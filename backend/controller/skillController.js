const Skill = require("../model/skills.js");

// @desc    Get all skills
// @route   GET /api/services/
exports.getAllSkill = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc    Create skill
// @route   POST /api/services/
exports.createSkill = async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: "Failed to create skill", error: err.message });
    }
};

// @desc    Update skill
// @route   PUT /api/services/:id
exports.updateSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSkill) return res.status(404).json({ message: "Skill not found" });
        res.status(200).json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: "Failed to update skill", error: err.message });
    }
};

// @desc    Delete skill
// @route   DELETE /api/services/:id
exports.deleteSkill = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSkill = await Skill.findByIdAndDelete(id);
        if (!deletedSkill) return res.status(404).json({ message: "Skill not found" });
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete skill", error: err.message });
    }
};
