import uuid
import json
import sys
import re

import pandas as pd
import requests
from bs4 import BeautifulSoup

parametre = sys.argv[1]
"football,optimization"
KEYWORDS = parametre.split(",")

#KEYWORDS = ["football", "optimization"]

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://edanurcovut:T3TzRKBzCl10k2vC@articlescraper.yljjzbu.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
except Exception as e:
    #print(e)
    pass

def getURL(keywords: list):
    URL = "https://link.springer.com/search?new-search=true&query="
    # Example url: https://link.springer.com/search?new-search=true&query=optimization%2C+football&content-type=article&dateFrom=&dateTo=&sortBy=relevance

    comma = "%2C"
    content = "&content-type=article&dateFrom=&dateTo=&sortBy=relevance"

    for key in keywords:
        last_key = keywords[-1]
        if key != last_key:
            URL += key + comma + "+"
        else:
            URL += key

    URL += content
    return URL

# //content parse
URL = getURL(KEYWORDS)
response = requests.get(URL)
soup = BeautifulSoup(response.content, "html.parser")
# makale bulunup dict içine atma
articles = soup.find_all("a", class_="c-card-open__link", href=True)
title_and_link = {"title": [],
                  "springer_url": [],
                  "pdf_url": []
}

for article in articles:
    if article["href"].startswith("/article"):
        title = article.text.split("\n")[1]
        link = article["href"]

        title_and_link["title"].append(title)
        title_and_link["springer_url"].append("https://link.springer.com" + link)
        title_and_link["pdf_url"].append(
            "https://link.springer.com/content/pdf" + link.split("article")[1] + ".pdf"
        )

data_ = []
 
for url in title_and_link["springer_url"]:
    articleResponse = requests.get(url)
    articleSoup = BeautifulSoup(articleResponse.content, "html.parser")

    journalID = str(uuid.uuid4())

    articleTitle = articleSoup.find("h1", class_="c-article-title").text
    articleWriters = [
        i.text.split("\xa0")[0]
        for i in articleSoup.find_all("li", class_="c-article-author-list__item")
    ]
    try:
        articleWriters = [
            re.split(r'(\d+)', i)[0]
            for i in articleWriters
        ]
    except:
        pass
    
    articleType = articleSoup.find_all("li", class_="c-breadcrumbs__item")[
        -1
    ].text.split("\n")[1]
    articleDate = (
        articleSoup.find("ul", class_="c-article-identifiers")
        .text.split("Published: ")[1]
        .split("\n")[0]
    )
    journalTitle = articleSoup.find(
        "span", class_="app-article-masthead__journal-title"
    ).text
    searchKeywords = KEYWORDS
    articleKeywords = [
        i.text
        for i in articleSoup.find_all("li", class_="c-article-subject-list__subject")
    ]
    articleAbstract = articleSoup.find("div", class_="c-article-section__content").text
    articleRefrences = [
        i.text
        for i in articleSoup.find_all(
            "li",
            class_="c-article-references__item js-c-reading-companion-references-item",
        )
    ]
    try:
        articleCitations = [i.text
                            for i in articleSoup.find_all(
                                "p",
                                class_="app-article-metrics-bar__count")
                            if "Citation" in i.text
        ][0].split("\n")[-1].split(" Citation")[0]
    except:
        articleCitations = 0

    articleDoi = [
        i.text
        for i in articleSoup.find_all(
            "span", class_="c-bibliographic-information__value"
        )
    ][-1]
    articleURL = url
    pdfURL = ("https://link.springer.com/content/pdf" + url.split("article")[1] + ".pdf")
# sonuçlar listeye atanır
    data_.append({
        "journalID": journalID,
        "articleTitle": articleTitle,
        "articleWriters": articleWriters,
        "articleType": articleType,
        "articleDate": articleDate,
        "journalTitle": journalTitle,
        "searchKeywords": searchKeywords,
        "articleKeywords": articleKeywords,
        "articleAbstract": articleAbstract,
        "articleRefrences": articleRefrences,
        "articleCitations": articleCitations,
        "articleDoi": articleDoi,
        "articleURL": articleURL,
        "pdfURL": pdfURL
    })

df = pd.DataFrame.from_dict(data_)
json_data = json.dumps(data_)

db = client["scrappedData"]

scrappeds = db["scrappeds"]
db.scrappeds.insert_many(data_)
print(json_data)