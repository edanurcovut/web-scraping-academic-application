"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scrappedSchema = new Schema({});


const Scrapped = mongoose.model("Scrapped", scrappedSchema);
module.exports = Scrapped;