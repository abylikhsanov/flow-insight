"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useOpcuaContext } from "@/context/opcua-context";
import { FixedSizeWindow } from "@/lib/fixed-size-window";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActiveValueStore } from "@/zustand/use-active-values";

type Props = {};
const LinearGraph = (props: Props) => {
  const { activeValues } = useActiveValueStore();
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [windowsSize, setWindowsSize] = useState(5);
  const [variables, setVariables] = useState([
    { name: "A", value: "", from: "" },
  ]);
  const [chartData, setChartData] = useState<{
    [key: string]: FixedSizeWindow;
  }>({});

  useEffect(() => {
    const initialWindows: { [key: string]: FixedSizeWindow } = {};
    selectedVariables.forEach((variable) => {
      initialWindows[variable] = new FixedSizeWindow(windowsSize);
    });
    setChartData(initialWindows);
  }, [windowsSize, selectedVariables]);

  useEffect(() => {
    if (selectedVariables.length > 0 && activeValues.length > 0) {
      const updatedChartData = { ...chartData };
      let dataChanged = false;

      selectedVariables.forEach((variable) => {
        const variableValue = activeValues.find(
          (a) => a.givenName === variable,
        );
        const newValue = variableValue ? variableValue.value : 0;
        console.log(`new value: ${JSON.stringify(chartData)}`);

        if (!updatedChartData[variable]) {
          updatedChartData[variable] = new FixedSizeWindow(windowsSize);
        }

        updatedChartData[variable].addValue(newValue);
        dataChanged = true;
      });

      setChartData(updatedChartData);
    }
  }, [activeValues]);

  const handleVariableChange = (givenName: string) => {
    setSelectedVariables((prev) =>
      prev.includes(givenName)
        ? prev.filter((v) => v !== givenName)
        : [...prev, givenName],
    );
  };

  const getOption = () => {
    const series = selectedVariables.map((variable) => ({
      name: variable,
      type: "line",
      data: chartData[variable] ? chartData[variable].getWindow() : [],
    }));

    console.log("Sersies Data:", series);

    return {
      title: {
        text: "Line Chart - Multiple",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: selectedVariables,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: Array.from({ length: windowsSize }, (_, i) => `T${i + 1}`),
      },
      yAxis: {
        type: "value",
      },
      series,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>Select variables and window size</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="font-bold">{variable.name}</span>
              <Select
                onValueChange={(givenName) => handleVariableChange(givenName)}
              >
                <SelectTrigger>
                  <SelectValue>{variable.from || "Select an item"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div>
                    <strong>Active values</strong>
                    {activeValues.map((activeValue, idx) => (
                      <SelectItem
                        key={`formula-${idx}`}
                        value={activeValue.givenName}
                      >
                        {activeValue.givenName}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          ))}
          <ReactECharts option={getOption()} style={{ height: 400 }} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LinearGraph;
