const Project = require('../model/Projects.js');

exports.validateCreateProject = async (req, res, next) => {
    console.log("project validation", req.body);
    const { title, slug, badge, heading, description, source, demo, overview, keyFeature, screenShot, techStack, projectStatus, clientDetails, otherProjects } = req.body;

    if (!title) return res.status(400).send({ error: "Title is required" });
    if (!slug) return res.status(400).send({ error: "Slug is required" });
    if (!Array.isArray(badge) || badge.length === 0) return res.status(400).send({ error: "Badge is required and should be an array" });
    if (!heading) return res.status(400).send({ error: "Heading is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!source) return res.status(400).send({ error: "Source is required" });
    if (!demo) return res.status(400).send({ error: "Demo is required" });
    if (!overview) return res.status(400).send({ error: "Overview is required" });
    if (!Array.isArray(keyFeature) || keyFeature.length === 0) return res.status(400).send({ error: "Key Feature is required and should be an array" });
    if (!Array.isArray(screenShot)) return res.status(400).send({ error: "ScreenShot is required and should be an array" });
    if (!Array.isArray(techStack) || techStack.length === 0) return res.status(400).send({ error: "TechStack is required and should be an array" });
    if (!projectStatus) return res.status(400).send({ error: "Project Status is required" });
    if (!clientDetails) return res.status(400).send({ error: "ClientDetails is required" });
    if (!Array.isArray(otherProjects)) return res.status(400).send({ error: "OtherProjects is required and should be an array" });

    // Validate otherProjects IDs exist in DB
    if (otherProjects.length > 0) {
        try {
            const validProjects = await Project.countDocuments({ _id: { $in: otherProjects } });
            if (validProjects !== otherProjects.length) {
                return res.status(404).send({ error: "One or more otherProject IDs are invalid" });
            }
        } catch (err) {
            return res.status(500).send({ error: "Error validating otherProjects", details: err.message });
        }
    }

    next();
};

exports.validateProjectById = async (req, res, next) => {
    const response = Project.find((req.params.id));
    if (!response) return res.status(404).send({ error: "Project not found" });
    next()
}
exports.validateProjectBySlug = async (req, res, next) => {
    const result = Project.find(req.params.slug);
    if (!result) return res.status(404).send({ error: "Project not found" });
    next()
}