import { Paper } from "@mui/material";
import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";
import { adminServices } from "../../services/admin.services";
import "./Dashboard.scss";

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([
    {
      data: [] as UsersByRole[],
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
    },
    {
      data: [] as DinosaursVsArticles[],
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
    },
    {
      title: {
        text: "Income and Expenses per Month",
      },
      data: [] as IncomeExpenses[],
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
    },
  ]);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    let data = dashboardData.slice();
    const usersByRole = await adminServices.getUsersByRole();
    const dinosaursVsArticles = await adminServices.getDinosaursVsArticles();
    const incomeExpenses = await adminServices.getIncomeExpenses();
    data[0].data = [...usersByRole];
    data[1].data = [...dinosaursVsArticles];
    data[2].data = [...incomeExpenses];
    setDashboardData([...data]);
  };

  return (
    <div className="flex column g20">
      <div className="flex  g20 dashboard__container">
        <Paper elevation={3} className="dashboard__small__chart">
          <AgCharts
            className="dashboard__chart"
            options={{ ...dashboardData[0] } as any}
          />
        </Paper>
        <Paper elevation={3} className="dashboard__small__chart">
          <AgCharts
            className="dashboard__chart"
            options={{ ...dashboardData[1] } as any}
          />
        </Paper>
      </div>
      <Paper elevation={3} className="dashboard__big__chart">
        <AgCharts
          className="dashboard__chart"
          options={{ ...dashboardData[2] } as any}
        />
      </Paper>
    </div>
  );
};
