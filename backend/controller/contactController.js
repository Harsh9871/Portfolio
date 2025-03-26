const Contact = require("../model/contacts.js");
const { sendMail } = require('./mailController.js');

// @desc    Get all contact forms
// @route   GET /api/contact
exports.getContact = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Add contact form
// @route   POST /api/contact
exports.addContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();

        // Optional: Send email notification
        await sendMail(email, "Contact Form Submission", `Thank you ${name} for reaching out.`);

        res.status(201).json({ message: 'Contact form submitted successfully', data: contact });
    } catch (error) {
        res.status(400).json({ message: 'Failed to submit contact form', error: error.message });
    }
};

// @desc    Update contact form (mark as read or edit)
// @route   PUT /api/contact/:id
exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json({ message: 'Contact updated', data: contact });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update contact', error: error.message });
    }
};

// @desc    Delete contact form
// @route   DELETE /api/contact/:id
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete contact', error: error.message });
    }
};
