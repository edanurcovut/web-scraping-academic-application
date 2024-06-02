import axios from "axios";
import { domain } from "./domain";


export const runScraper = (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        data,
    };
    return axios(domain + "runScraper", requestOptions)
        .then((response) => {
            if (response.data.code) {
                return response;
            } else {
                throw new Error("Network Error!");
            }
        })
        .catch((error) => {
            return error;
        });
};

export const getScrapedData = (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        data,
    };
    return axios(domain + "scrapedData", requestOptions)
        .then((response) => {
            if (response.data.code) {
                return response;
            } else {
                throw new Error("Network Error!");
            }
        })
        .catch((error) => {
            return error;
        });
};