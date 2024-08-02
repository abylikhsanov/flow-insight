"use client";
import "react-resizable/css/styles.css";
import { useOpcUaNodeStore } from "@/zustand/use-opcua-nodes.ts";
import { useCallback, useEffect, useState } from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from "react-fusioncharts";

const schema = [
  {
    name: "Time",
    type: "date",
    format: "%-m/%-d/%Y",
  },
  {
    name: "Sales",
    type: "number",
  },
];

ReactFC.fcRoot(FusionCharts, TimeSeries);
const chart_props = {
  timeseriesDs: {
    type: "timeseries",
    width: "600",
    height: "400",
    dataEmptyMessage: "Fetching data...",
    dataSource: {
      caption: { text: "Historical data viewer" },
      data: null,
      yAxis: [
        {
          plot: [
            {
              value: "Y",
            },
          ],
        },
      ],
    },
  },
};

const API_URL =
  "https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/master/assets/datasources/fusiontime/examples/online-sales-single-series/data.json";

const TimeSeriesGraph = () => {
  const { opcUaNodes } = useOpcUaNodeStore();

  const [ds, setds] = useState(chart_props);
  const loadData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema,
      );
      const options = { ...ds };
      options.timeseriesDs.dataSource.data = fusionTable;
      setds(options);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log("render");
    loadData();
  }, [loadData]);

  return (
    <div className="flex flex-col bg-yellow-200 border-dark border-2">
      <div className="flex">
        <div className="flex flex-col space-y-3">
          {opcUaNodes.map((node, index) => (
            <div key={index}>{node.nodeName}</div>
          ))}
        </div>
        <div className="col-span-2">
          <ReactFC {...ds.timeseriesDs} />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <p>Calculation area</p>
      </div>
    </div>
  );
};

export default TimeSeriesGraph;
