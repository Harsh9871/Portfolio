const Newsletter = require('../model/newsletters.js');

// @desc    Get all subscribers
// @route   GET /api/newsletter/
module.exports.getNewsletter = async (req, res) => {
    try {
        const subscribers = await Newsletter.find();
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// @desc    Add new subscriber
// @route   POST /api/newsletter/
module.exports.addNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        const existingSubscriber = await Newsletter.findOne({ email });

        if (existingSubscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        const subscriber = new Newsletter({ email });
        await subscriber.save();
        res.status(201).json(subscriber);
    } catch (err) {
        res.status(400).json({ message: "Failed to subscribe", error: err.message });
    }
};

// @desc    Delete subscriber
// @route   DELETE /api/newsletter/:id
module.exports.deleteNewsletter = async (req, res) => {
    try {
        const deletedSubscriber = await Newsletter.findByIdAndDelete(req.params.id);
        if (!deletedSubscriber) return res.status(404).json({ message: "Subscriber not found" });

        res.status(200).json({ message: "Subscriber deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete subscriber", error: err.message });
    }
};
