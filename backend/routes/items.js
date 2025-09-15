const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Item = require("../models/Item");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});


const upload = multer({ storage });

// POST item with image
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {

     console.log("REQ BODY:", req.body); // <-- debug
    console.log("REQ FILE:", req.file);
    const { name, desc, contact, location } = req.body;
        const image = req.file ? req.file.filename : null;
    const newItem = new Item({
      name,
      desc,
      contact,
      location,
     image: req.file ? req.file.filename : null, // link item to user
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// GET all items


// DELETE an item by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.deleteOne();

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
