const express = require("express");
const {
  getNotes,
  createNote,
  getNoteByid,
  Updatenote,
  DeleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteByid)
  .put(protect, Updatenote)
  .delete(protect, DeleteNote);

module.exports = router;
