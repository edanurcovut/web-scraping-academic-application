import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";
import VuiBox from "components/VuiBox";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CircularProgress from '@mui/material/CircularProgress';
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VuiTypography from "components/VuiTypography";
import { getScrapedData } from "_services/prediction";
import { useEffect, useState } from "react";

function ScrapedDataTable() {

    const [rows, setRows] = useState([])
    const [journalID, setJournalID] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleWriter, setArticleWriter] = useState("");
    const [articleType, setArticleType] = useState("");
    const [articleDate, setArticleDate] = useState("");
    const [journalTitle, setJournalTitle] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [articleKeyword, setArticleKeyword] = useState("");
    const [articleAbstract, setArticleAbstract] = useState("");
    const [articleRefrence, setArticleRefrence] = useState("");
    const [articleCitation, setArticleCitation] = useState("");
    const [articleDoi, setArticleDoi] = useState("");
    const [articleURL, setArticleURL] = useState("");
    const [pdfURL, setPdfURL] = useState("");
    const [filteringOptions, setFilteringOptions] = useState("")
    const [loading, setLoading] = useState(false);


    const rowRenderer = (rows) => rows.map((item) => ({

        journalID: <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.journalID ? item.journalID : ""}
            </VuiTypography>,
        articleTitle:<VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.articleTitle ? item.articleTitle : ""}
            </VuiTypography>,
        articleWriters:<VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                {(item.articleWriters && item.articleWriters.length && Array.isArray(item.articleWriters)) > 0 ? item.articleWriters.join(", ") : ""}
            </VuiTypography>,
        articleType: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.articleType ? item.articleType : ""}
            </VuiTypography>
        ),
        articleDate: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.articleDate ? item.articleDate : ""}
            </VuiTypography>
        ),
        journalTitle: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.journalTitle ? item.journalTitle : ""}
            </VuiTypography>
        ),
        searchKeywords: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {(item.searchKeywords && item.searchKeywords.length && Array.isArray(item.searchKeywords)) > 0 ? item.searchKeywords.join(", ") : ""}
            </VuiTypography>
        ),
        articleKeywords: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.articleKeywords && item.articleKeywords.length && Array.isArray(item.articleKeywords) > 0 ? item.articleKeywords.join(", ") : ""}
            </VuiTypography>
        ),
        articleAbstract: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.articleAbstract ? item.articleAbstract : ""}
            </VuiTypography>
        ),
        articleRefrences: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.articleRefrences && item.articleRefrences.length && Array.isArray(item.articleRefrences) > 0 ? item.articleRefrences.join(" | ") : ""}
            </VuiTypography>
        ),
        articleCitations: (
            <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.articleCitations ? item.articleCitations : ""}
            </VuiTypography>
        ),
        articleDoi: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
            {item.articleDoi ? item.articleDoi : ""}
            </VuiTypography>
        ),
        articleURL: (
            <VuiTypography component="a" href={item.articleURL} variant="caption" color="text" fontWeight="medium">
            {item.articleURL ? item.articleURL : ""}
            </VuiTypography>
        ),
        pdfURL: (
            <VuiTypography component="a" href={item.pdfURL}  variant="caption" color="white" fontWeight="medium">
                {item.pdfURL ? item.pdfURL : ""}
            </VuiTypography>
        ),
        }))

    const getData = async () => {
        setLoading(true)
        getScrapedData({ })
        .then((response) => {
            setRows(rowRenderer(response.data.data))
        })
        .finally(() => {
            setLoading(false)
        })
        
     }

    useEffect(() => {
        getData()
    }, []); 

    const handleFilterClick = () => {
        setLoading(true)
        getScrapedData({ 
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
        })
            .then((response) => {
                setRows(rowRenderer((response.data.data)))
                setFilteringOptions(
                    `
                    ${journalID ? `Journal ID: ${journalID}\t, ` : ""}
                    ${articleTitle ? `Article Title: ${articleTitle}, ` : ""}
                    ${articleWriter ? `Article Writer: ${articleWriter}, ` : ""}
                    ${articleType ? `Article Type: ${articleType}, ` : ""}
                    ${articleDate ? `Article Date: ${articleDate}, ` : ""}
                    ${journalTitle ? `Journal Title: ${journalTitle}, ` : ""}
                    ${searchKeyword ? `Search Keyword: ${searchKeyword}, ` : ""}
                    ${articleKeyword ? `Article Keyword: ${articleKeyword}, ` : ""}
                    ${articleAbstract ? `Article Abstract: ${articleAbstract}, ` : ""}
                    ${articleRefrence ? `Article Refrence: ${articleRefrence}, ` : ""}
                    ${articleCitation ? `Article Citation: ${articleCitation}, ` : ""}
                    ${articleDoi ? `Article DOI: ${articleDoi}, ` : ""}
                    ${articleURL ? `Article URL: ${articleURL}, ` : ""}
                    ${pdfURL ? `PDF URL: ${pdfURL}, ` : ""}
                    `
                )

            })
            .finally(() => {
                setLoading(false)
            })

    }

    const reset = () => {
        setJournalID("");
        setArticleTitle("");
        setArticleWriter("");
        setArticleType("");
        setArticleDate("");
        setJournalTitle("");
        setSearchKeyword("");
        setArticleKeyword("");
        setArticleAbstract("");
        setArticleRefrence("");
        setArticleCitation("");
        setArticleDoi("");
        setArticleURL("");
        setPdfURL("");
        getData()
        setFilteringOptions("")
    }
    
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <VuiBox py={3}>
                <Card 
                    sx={{
                        marginBottom: "30px",
                   
                    }}
                >
                    <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="10px">
                        <VuiTypography variant="lg" color="white">
                            Filter Options
                        </VuiTypography>
                    </VuiBox>

                    <VuiBox display="flex" justifyContent="center" alignItems="center" mb="10px">
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Journal ID
                            </VuiTypography>
                            <VuiInput
                                value = {journalID}
                                onChange = {(e) => setJournalID(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Title
                            </VuiTypography>
                            <VuiInput
                                value = {articleTitle}
                                onChange = {(e) => setArticleTitle(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Writer
                            </VuiTypography>
                            <VuiInput
                                value = {articleWriter}
                                onChange = {(e) => setArticleWriter(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Type
                            </VuiTypography>
                            <VuiInput
                                value = {articleType}
                                onChange = {(e) => setArticleType(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Date
                            </VuiTypography>
                            <VuiInput
                                value = {articleDate}
                                onChange = {(e) => setArticleDate(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Journal Title
                            </VuiTypography>
                            <VuiInput
                                value = {journalTitle}
                                onChange = {(e) => setJournalTitle(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Search Keyword
                            </VuiTypography>
                            <VuiInput
                                value = {searchKeyword}
                                onChange = {(e) => setSearchKeyword(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                    </VuiBox>

                    <VuiBox display="flex" justifyContent="center" alignItems="center" mb="10px">
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Keyword
                            </VuiTypography>
                            <VuiInput
                                value = {articleKeyword}
                                onChange = {(e) => setArticleKeyword(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Abstract
                            </VuiTypography>
                            <VuiInput
                                value = {articleAbstract}
                                onChange = {(e) => setArticleAbstract(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Reference
                            </VuiTypography>
                            <VuiInput
                                value = {articleRefrence}
                                onChange = {(e) => setArticleRefrence(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article Citation
                            </VuiTypography>
                            <VuiInput
                                value = {articleCitation}
                                onChange = {(e) => setArticleCitation(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article DOI
                            </VuiTypography>
                            <VuiInput
                                value = {articleDoi}
                                onChange = {(e) => setArticleDoi(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                Article URL
                            </VuiTypography>
                            <VuiInput
                                value = {articleURL}
                                onChange = {(e) => setArticleURL(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                        {/* *************** */}
                        <VuiBox
                            sx={() => ({
                                marginTop: "10px !important",
                                marginRight: "10px !important",
                            })}
                        >
                            <VuiTypography 
                                variant="sm" 
                                color="white" 
                                style={{ fontSize: "12px" }}    
                            >
                                PDF URL
                            </VuiTypography>
                            <VuiInput
                                value = {pdfURL}
                                onChange = {(e) => setPdfURL(e.target.value)}
                                sx={({ breakpoints }) => ({
                                    marginTop: "8px !important",
                                    marginRight: "10px !important",
                                    backgroundColor: "info.main !important",
                                    height: "40px !important",
                                    fontSize: "14px !important",
                                    "&::placeholder": {
                                        fontSize: "14px !important",
                                    },
                                })}
                            />

                        </VuiBox>
                    </VuiBox>

                    <VuiBox display="flex" justifyContent="center" alignItems="center" mb="50px">
                        <VuiButton
                            color="warning"
                            onClick={reset}
                            sx = {({ breakpoints }) => ({
                                marginTop: "30px",
                                marginRight: "10px",
                            })}
                            size="large"
                        >
                            Reset
                        </VuiButton>
                        <VuiButton
                            color="success"
                            onClick={handleFilterClick}
                            sx = {({ breakpoints }) => ({
                                marginTop: "30px",
                            })}
                            size="large"
                        >
                            Filter Data
                        </VuiButton>
                    </VuiBox>
                </Card>


                {filteringOptions && (
                    <Card
                        sx={{
                            marginBottom: "30px",
                    
                        }}
                    >
                        <VuiBox display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" mb="15px">
                            <VuiTypography variant="lg" color="white">
                                Filtering options:
                            </VuiTypography>

                            {filteringOptions.split(",").map((item, index) => (
                                <VuiTypography>
                                    {item}
                                </VuiTypography>
                            )) }
                        </VuiBox>     
                    </Card>
                )}

                <Card>
                    <VuiBox
                        sx={{
                            "& th": {
                                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                                    `${borderWidth[1]} solid ${grey[700]}`,
                            },
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                                        `${borderWidth[1]} solid ${grey[700]}`,
                                },
                            },
                        }}
                    >
                    { loading && (
                        <VuiBox
                            sx={() => ({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "50px",
                            })}
                        >
                            <CircularProgress color="success" />
                        </VuiBox>
                    )}

                    {rows.length > 0 && (
                        <>
                            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="15px">
                                <VuiTypography variant="lg" color="white">
                                    Data
                                </VuiTypography>
                            </VuiBox>
                            <Table rows={rows} />
                        </>
                    )}
                    </VuiBox>
                </Card>
            </VuiBox>
        </DashboardLayout>
    );
}

export default ScrapedDataTable;
