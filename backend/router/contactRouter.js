const express = require("express");
const router = express.Router();
const {
    addContact,
    deleteContact,
    getContact,
    updateContact
} = require("../controller/contactController.js");

router.get('/', getContact);
router.post("/", addContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;