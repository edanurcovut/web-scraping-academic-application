"use strict";
// const Scra = require('../models/product')
const Scrapped = require('../models/scrapped')
require("dotenv").config();

const runPythonScraper = require("./runner");
module.exports = {

    runScraper: async(req, res, next) => {

        const { searchString } = req.body;
        
        let keywordsArr = searchString.split(",");

        keywordsArr = keywordsArr.map(keyword => keyword.trim());

        let updatedString = keywordsArr.join(",");

        runPythonScraper(updatedString)
            .then(output => {
                res.json({
                    code: 200,
                    data:  output,
                });
            })
    },

    getScrapedData: async(req, res, next) => {

        const { 
            journalID,
            articleTitle,
            articleWriter,
            articleType,
            articleDate,
            journalTitle,
            searchKeyword,
            articleKeyword,
            articleAbstract,
            articleRefrence,
            articleCitation,
            articleDoi,
            articleURL,
            pdfURL
        } = req.body;

        let andArray = [{}]

        if (journalID) {
            andArray = [
                ...andArray,
                { journalID: journalID }
            ];
        }

        if (articleTitle) {
            andArray = [
                ...andArray,
                { articleTitle: articleTitle }
            ];
        }

        if (articleType) {
            andArray = [
                ...andArray,
                { articleType: articleType }
            ];
        }

        if (articleDate) {
            andArray = [
                ...andArray,
                { articleDate: articleDate }
            ];
        }

        if (journalTitle) {
            andArray = [
                ...andArray,
                { journalTitle: journalTitle }
            ];
        }

        if (articleAbstract) {
            andArray = [
                ...andArray,
                { articleAbstract: articleAbstract }
            ];
        }

        if (articleCitation) {
            andArray = [
                ...andArray,
                { articleCitation: articleCitation }
            ];
        }

        if (articleDoi) {
            andArray = [
                ...andArray,
                { articleDoi: articleDoi }
            ];
        }

        if (articleURL) {
            andArray = [
                ...andArray,
                { articleURL: articleURL }
            ];
        }

        if (pdfURL) {
            andArray = [
                ...andArray,
                { pdfURL: pdfURL }
            ];
        }

        if (articleKeyword) {
            andArray = [
                ...andArray,
                { articleKeywords: articleKeyword }
            ];
        }

        if (articleWriter) {
            andArray = [
                ...andArray,
                { articleWriters: articleWriter }
            ];
        }

        if (searchKeyword) {
            andArray = [
                ...andArray,
                { searchKeywords: searchKeyword }
            ];
        }

        if (articleRefrence) {
            andArray = [
                ...andArray,
                { articleRefrences: articleRefrence }
            ];
        }
        
        let qq = { $and: andArray };

        try {
            const data = await Scrapped.aggregate([
                {
                    $match: qq
                },
            ])
            
            res.json({
                code: 200,
                data:  data,
            });
            
        } catch (err) {
            next(err);
        }
    },
}