import VuiBox from "components/VuiBox";
import Table from "examples/Tables/Table";
import VuiButton from "components/VuiButton";
import VuiInput from "components/VuiInput";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SendIcon from '@mui/icons-material/SendAndArchive';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { runScraper } from "_services/prediction";

function Products() {

    const [searchString, setSearchString] = useState("");
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([])

    const handleClick = () => {
        if(searchString === "") {
            alert("Please enter a list of search keywords");
            return;
        }
        setLoading(true);
        getData()
    }

    const stop = () => {
        setLoading(false);
    }

    const getData = async () => {
        await Promise.allSettled([
            runScraper({
                searchString: searchString,
             })
                 .then((response) => {
                    setLoading(false)
                    setRows(JSON.parse(response.data.data).map((item) => ({

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
                        })))
                 }
             )
         ])
     }
 
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <VuiBox py={3}>
            <VuiTypography 
                variant="lg" 
                color="white" 
                fontWeight="bold"
                sx={() => ({
                    marginTop: "50px !important",
                })}
            >
                Enter a list of search keywords  <small> (separated with commas: orange, apple etc.)</small>
            </VuiTypography>
            <VuiBox
                sx={() => ({
                    display: "flex",
                    marginTop: "20px !important",
                    justifyContent: "center",
                })}
            >
                <VuiInput
                    value = {searchString}
                    onChange = {(e) => setSearchString(e.target.value)}
                    placeholder="Enter search keywords: building, construction, etc."
                    sx={({ breakpoints }) => ({
                        maxWidth: "80%",
                        backgroundColor: "info.main !important",
                        height: "60px !important",
                        fontSize: "20px !important",
                        "&::placeholder": {
                            fontSize: "20px !important",
                        },
                        
                    })}
                />
                <LoadingButton
                    size="large"
                    onClick={handleClick}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    sx={{
                        marginLeft: "10px",
                        color: "white !important",
                        "&.MuiButton-contained.Mui-disabled": {
                            backgroundColor: "#66d432 !important",
                            color: "white !important",
                        },
                    }}
                    >
                    <span>{loading ? "Scraping..." :"Start Scraper"}</span>
                </LoadingButton>
            </VuiBox>

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
                    <VuiButton
                        color="warning"
                        onClick={stop}
                        sx = {({ breakpoints }) => ({
                            marginTop: "30px",
                        })}
                        size="large"
                    >
                        Stop Scraping
                    </VuiButton>
                </VuiBox>
            )}
            </VuiBox>
            <VuiBox>
                {rows.length > 0 && (
                    <Table rows={rows} />
                )}
            </VuiBox>
        </DashboardLayout>
    );
}

export default Products;
