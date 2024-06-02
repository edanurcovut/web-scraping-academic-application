"use strict";

const express = require("express");
const router = express.Router();
require("dotenv").config();

router.use(function (req, res, next) { //this middleware is for CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Authorization, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//route imports
const routes = require("./model");

// TEST - Get request on '/'
router.get("/", function (req, res, next) {
    res.json({ message: "API router works fine!!" });
});

//routes 
router.use("/", routes);

// Error handler
router.use((err, req, res, next) => {
    res.status(500),
        res.json({
            status: "failure",
            code: 500,
            message: "Something went wrong! " + err,
        });
});

// Not Found
router.use((req, res, next) => {
    res.json({
        status: "failure",
        code: 404,
        message: req.originalUrl + " Page Not Found!",
    });
});

module.exports = router;
