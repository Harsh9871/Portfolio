const Project = require('../model/Projects.js');

// @desc    Get all projects
// @route   GET /api/projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        if (!projects) {
            return res.status(404).send({
                success: false,
                message: "No projects found",
                status: "error",
            });
        }

        res.status(200).send({
            success: true,
            message: "Projects fetched successfully",
            status: "ok",
            count: projects.length,
            projects: projects.map(result => ({
                id: result._id,
                title: result.title,
                slug: result.slug,
                bgImage: result.bgImage,
                badge: result.badge,
                heading: result.heading,
                description: result.description,
                views: result.views,
                likes: result.likes,
                source: result.source,
                demo: result.demo,
                overviews: result.overviews,
                helpedBy: result.helpedBy,
                keyFeature: result.keyFeature,
                screenShot: result.screenShot,
                techStack: result.techStack,
                projectStatus: result.projectStatus,
                clientDetails: result.clientDetails,
                otherProjects: result.otherProjects,
            }))

        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Server error while fetching projects",
            status: "error",
        });
    }
};

// @desc    Add new project
// @route   POST /api/projects/
exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send({ message: "Project created successfully" });
    } catch (error) {
        // Handle duplicate key error (MongoDB unique constraint)
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyPattern)[0];
            return res.status(400).send({
                error: `${duplicateField} already exists. Please use a unique value.`
            });
        }

        // Other server errors
        res.status(500).send({
            error: "Server Error",
            details: error.message
        });
    }
};


// @desc    Get Project by id
// @route   GET /api/projects/:id
exports.getProjectBySlug = async (req, res) => {
    console.log("get project by slug" , req.body);

    const slug = req.params.slug;

    try {
        const result = await Project.findOne({ slug });

        if (!result) {
            return res.status(404).send({
                success: false,
                message: "No project found with this slug",
            });
        }
        result.views += 1;
        await result.save()
        const response = {
            id: result._id,
            title: result.title,
            slug: result.slug,
            bgImage: result.bgImage,
            badge: result.badge,
            heading: result.heading,
            description: result.description,
            likes: result.likes,
            views: result.views+1,
            source: result.source,
            demo: result.demo,
            overviews: result.overviews,
            helpedBy: result.helpedBy,
            keyFeature: result.keyFeature,
            screenShot: result.screenShot,
            techStack: result.techStack,
            projectStatus: result.projectStatus,
            clientDetails: result.clientDetails,
            otherProjects: result.otherProjects,
        };

        res.status(200).send({
            success: true,
            message: "Project fetched successfully",
            status: "ok",
            project: response,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Server error while fetching project",
            status: "error",
        });
    }
};


// @desc    Update project by id
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res) => {
    console.log("update project" , req.body);

    const { id } = req.params;
    const updates = req.body;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).send({
                success: false,
                message: "No project found with this ID",
                status: "error"
            });
        }

        // Increment likes or views if present
        if (updates.likes) {
            project.likes = (project.likes || 0) + 1;
        }

        if (updates.views) {
            project.views = (project.views || 0) + 1;
        }

        // Update other fields if provided
        for (let key in updates) {
            if (key !== 'likes' && key !== 'views' && updates[key] !== undefined) {
                project[key] = updates[key];
            }
        }

        await project.save();

        res.status(200).send({
            success: true,
            message: "Project updated successfully",
            status: "ok",
            project
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Server error while updating project",
            status: "error"
        });
    }
};


// @desc    Delete project by id
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    console.log("delete project" , req.body);
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).send({
                success: false,
                message: "No project found with this ID",
                status: "error"
            });
        }

        res.status(200).send({
            success: true,
            message: "Project deleted successfully",
            status: "ok"
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Server error while deleting project",
            status: "error"
        });
    }
};
