const express = require("express");

const router = express.Router();

router.get("/healthy", async (req, res) => {
  res.status(200).send("readyness: ok");
});

router.get("/healthz", async (req, res) => {
  res.status(200).send("liveness: ok");
});

module.exports = router;
