import { Paper } from "@mui/material";
import { AgCharts, AgChartProps } from "ag-charts-react";
import { useState } from "react";

export const Dashboard = () => {
  const [options, setOptions] = useState({
    data: [
      { asset: "Stocks", amount: 60000 },
      { asset: "Bonds", amount: 40000 },
      { asset: "Cash", amount: 7000 },
      { asset: "Real Estate", amount: 5000 },
      { asset: "Commodities", amount: 3000 },
    ],
    title: {
      text: "Portfolio Composition",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });

  const [optionsBar, setOptionsBar] = useState({
    title: {
      text: "Apple's Revenue by Product Category",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    data: [
      {
        quarter: "Q1'18",
        iphone: 140,
        mac: 16,
        ipad: 14,
        wearables: 12,
        services: 20,
      },
      {
        quarter: "Q2'18",
        iphone: 124,
        mac: 20,
        ipad: 14,
        wearables: 12,
        services: 30,
      },
      {
        quarter: "Q3'18",
        iphone: 112,
        mac: 20,
        ipad: 18,
        wearables: 14,
        services: 36,
      },
      {
        quarter: "Q4'18",
        iphone: 118,
        mac: 24,
        ipad: 14,
        wearables: 14,
        services: 36,
      },
    ],
    series: [
      {
        type: "bar",
        xKey: "quarter",
        yKey: "iphone",
        yName: "iPhone",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "mac",
        yName: "Mac",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "ipad",
        yName: "iPad",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "wearables",
        yName: "Wearables",
      },
      {
        type: "bar",
        xKey: "quarter",
        yKey: "services",
        yName: "Services",
      },
    ],
  });

  return (
    <div className="flex column g20">
      <div className="flex  column g20 ">
        <Paper elevation={3} style={{ width: "100%", height: "300px" }}>
          <AgCharts
            style={{ width: "100%", height: "100%" }}
            options={options as any}
          />
        </Paper>
        <Paper
          elevation={3}
          style={{
            width: "100%",
            height: "300px",
          }}
        >
          <AgCharts
            style={{ width: "100%", height: "100%" }}
            options={options as any}
          />
        </Paper>
      </div>
      <Paper elevation={3} style={{ height: "550px" }}>
        <AgCharts
          style={{ width: "100%", height: "100%" }}
          options={optionsBar as any}
        />
      </Paper>
    </div>
  );
};
