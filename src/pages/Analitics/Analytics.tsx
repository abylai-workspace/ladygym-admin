import React, { useEffect, useState } from "react";
import SaleChart from "../../components/chart/Chart";
import Finance from "./components/Finance";
import CountVisit from "./components/CountVisit";
import CountNext from "./components/CountNext";
import Tabs from "./components/Tabs";
import { useSelector } from "react-redux";
import { getAllClients } from "../../config/axios";

function Analytics() {

  const tabs = [
    {
        title: "Финансовая",
        content: <Finance />,
    },
    {
        title: "Учет посещений",
        content: <CountVisit />,
    },
    {
        title: "Учет продлений",
        content: <CountNext />,
    },
];
  return <div>
     
           
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Tabs tabs={tabs} defaultTab={0} />
            </div>
     

  </div>;
}

export default Analytics;
