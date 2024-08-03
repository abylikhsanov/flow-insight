"use client";
import "react-resizable/css/styles.css";
import { useOpcUaNodeStore } from "@/zustand/use-opcua-nodes.ts";
import { useCallback, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const TimeSeriesGraph = () => {
  const { opcUaNodes } = useOpcUaNodeStore();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2021-06-06");
  const [endDate, setEndDate] = useState("2024-06-06");

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/timeseries/123/${startDate.replace(
          /-/g,
          "/",
        )}/${endDate.replace(/-/g, "/")}`,
      );
      console.log(`Response: ${import.meta.env.VITE_BACKEND_URI}`);
      const data = await response.json();
      const formattedData = data.map(([date, value]: [string, number]) => [
        new Date(date).getTime(), // Convert date to timestamp
        value,
      ]);
      setData(formattedData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end",
  ) => {
    const { value } = e.target;
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const getOption = () => ({
    title: {
      text: "Time Series Analysis",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const [date, value] = params[0].value;
        return `${new Date(date).toLocaleDateString()}<br/>Value: ${value.toFixed(
          2,
        )}`;
      },
    },
    xAxis: [
      {
        type: "time",
        boundaryGap: false,
        gridIndex: 0, // Main chart
        axisLabel: {
          formatter: "{yyyy}-{MM}-{dd}",
        },
      },
      {
        type: "time",
        boundaryGap: false,
        gridIndex: 1, // Overview chart
        show: false, // Hide x-axis in overview for cleaner look
      },
    ],
    yAxis: [
      {
        type: "value",
        gridIndex: 0, // Main chart
        boundaryGap: [0, "20%"],
      },
      {
        type: "value",
        gridIndex: 1, // Overview chart
        boundaryGap: [0, "20%"],
        show: false, // Hide y-axis in overview
      },
    ],
    grid: [
      {
        left: "10%",
        right: "8%",
        height: "60%", // Increase main chart height
      },
      {
        left: "10%",
        right: "8%",
        top: "70%",
        height: "15%", // Smaller height for overview
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: 0,
        start: 0,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: 0,
        type: "slider",
        top: "85%",
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Main Data",
        type: "line",
        smooth: true,
        data: data,
        xAxisIndex: 0,
        yAxisIndex: 0,
        color: "#5470C6", // Main chart color (blue)
        markArea: {
          itemStyle: {
            color: "rgba(255, 173, 177, 0.4)",
          },
          data: [
            [
              {
                name: "Zoomed Area",
                xAxis: "2023/01/01",
              },
              {
                xAxis: "2023/12/31",
              },
            ],
          ],
        },
      },
    ],
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col bg-yellow-200 border-dark border-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-3">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e, "start")}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange(e, "end")}
              className="ml-2 border rounded px-2 py-1"
            />
          </label>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Load Data
          </button>
        </div>
      </div>
      <ReactECharts
        option={getOption()}
        style={{ height: 500, width: "100%" }}
      />
      <div className="flex flex-col space-y-3 mt-4">
        <p>Calculation area</p>
      </div>
    </div>
  );
};

export default TimeSeriesGraph;
