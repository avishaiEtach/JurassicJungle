import { Paper } from "@mui/material";
import { AgCharts, AgChartProps } from "ag-charts-react";
import { useEffect, useState } from "react";
import { http } from "../../http";

export const Dashboard = () => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: "User proportion by role",
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
    data: [
      { asset: "dinosaurs", amount: 120 },
      { asset: "articles", amount: 50 },
    ],
    title: {
      text: "Proportion of Dinosaurs vs. Articles",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });

  const [optionsLine, setOptionsLine] = useState({
    title: {
      text: "Income and Expenses per Month",
    },
    data: [
      { month: "January", income: 12000, expenses: 7000 },
      { month: "February", income: 11500, expenses: 10000 },
      { month: "March", income: 13000, expenses: 9000 },
      { month: "April", income: 12500, expenses: 11500 },
      { month: "May", income: 13500, expenses: 7100 },
      { month: "June", income: 12800, expenses: 10000 },
      { month: "July", income: 13200, expenses: 11000 },
      { month: "August", income: 14000, expenses: 12000 },
      { month: "September", income: 12500, expenses: 13200 },
      { month: "October", income: 12750, expenses: 9000 },
      { month: "November", income: 12900, expenses: 14000 },
      { month: "December", income: 13500, expenses: 10000 },
    ],

    series: [
      {
        type: "line",
        xKey: "month",
        xName: "Month",
        yKey: "income",
        yName: "Income",
        interpolation: { type: "smooth" },
        stroke: "#459D55",
        marker: {
          fill: "#459D55",
        },
        tooltip: {
          renderer: (params: any) => {
            return { backgroundColor: "#459D55" };
          },
        },
      },
      {
        type: "line",
        xKey: "month",
        xName: "Month",
        yKey: "expenses",
        yName: "Expenses",
        interpolation: { type: "smooth" },
        stroke: "#EF5452",
        marker: {
          fill: "#EF5452",
        },
        tooltip: {
          renderer: (params: any) => {
            return { backgroundColor: "#EF5452" };
          },
        },
      },
    ],
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    const res1 = await http.get("/getUsersByRole");
    setOptions((prev) => {
      return {
        ...prev,
        data: res1,
      };
    });
    const res2 = await http.get("/getDinosaursVsArticles");
    setOptionsBar((prev) => {
      return {
        ...prev,
        data: res2,
      };
    });
    const res3 = await http.get("/getIncomeExpenses");
    setOptionsLine((prev) => {
      return {
        ...prev,
        data: res3,
      };
    });
  };

  return (
    <div className="flex column g20">
      <div className="flex  g20 ">
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
            options={optionsBar as any}
          />
        </Paper>
      </div>
      <Paper elevation={3} style={{ height: "550px" }}>
        <AgCharts
          style={{ width: "100%", height: "100%" }}
          options={optionsLine as any}
        />
      </Paper>
    </div>
  );
};
