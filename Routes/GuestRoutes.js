const express = require("express");
const router = express.Router();
const {Guest} = require("./../Models/personNew");

// GET all guests
router.get("/guests", async (req, res) => {
  try {
    
    const guest_data = await Guest.find();
    console.log(guest_data);
    if (guest_data.length === 0) {
      return res.status(404).json({ error: "No guests found" });
    }
    res.status(200).json(guest_data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST new guest
router.post('/guests', async (req, res) => {
  try {
    const guestData = req.body;
    const newGuest = new Guest(guestData);
    const savedGuest = await newGuest.save();
    console.log("Guest data saved:", savedGuest);
    res.status(200).json({ message: "Guest added successfully", data: savedGuest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// UPDATE guest by ID
router.put('/guests_update', async (req, res) => {
  try {
    const guest_data  = req.body;
    // console.log(id)
    // const updateData = ;/
    const updatedGuest = await Guest.findByIdAndUpdate(guest_data.id, guest_data, { new: true });
    if (!updatedGuest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    console.log("Guest updated:", updatedGuest);
    res.status(200).json({ message: "Guest updated successfully", data: updatedGuest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE guest by ID
router.delete("/guests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delGuest = await Guest.findByIdAndDelete(id);
    if (!delGuest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    console.log("Guest deleted:", delGuest);
    res.status(200).json({ message: "Guest deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Insert many guests
router.post("/guests/insertMany", async (req, res) => {
  try {
    const manyGuests = req.body;
    const insertedGuests = await Guest.insertMany(manyGuests);
    res.status(200).json({ message: `${insertedGuests.length} guests inserted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
