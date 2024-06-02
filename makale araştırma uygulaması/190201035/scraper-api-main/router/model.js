"use strict"

const express = require("express")
const router = express.Router()

const modelController = require("../controllers/model")

// model routes
router.post("/runScraper", modelController.runScraper);
router.post("/scrapedData", modelController.getScrapedData);

module.exports = router