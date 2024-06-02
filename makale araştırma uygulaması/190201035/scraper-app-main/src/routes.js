import Data from "layouts/data";
import ScrapeData from "layouts/scrape";
import { BsDatabaseAdd, BsDownload } from "react-icons/bs";

const routes = [
  {
    type: "collapse",
    name: "Scrape Data",
    key: "scrape",
    route: "/scrape",
    icon: <BsDownload size="15px" color="inherit" />,
    component: ScrapeData,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Data",
    key: "data",
    route: "/data",
    icon: <BsDatabaseAdd size="15px" color="inherit" />,
    component: Data,
    noCollapse: true,
  },
];

export default routes;
