const express = require("express");
const { setLog, getLogs, getLog } = require("./controllers/logsController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// get all user logs
router.get("/", protect, getLogs);
//
router.get("/:id", protect, getLog);
// set new log
router.post("/", protect, setLog);

module.exports = router;
