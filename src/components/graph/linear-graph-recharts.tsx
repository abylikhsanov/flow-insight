"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useOpcuaContext } from "@/context/opcua-context";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FixedSizeWindow } from "@/lib/fixed-size-window";
import { useActiveValueStore } from "@/zustand/use-active-values";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type DataPoint = {
  timestamp: string;
  [key: string]: number | string;
};

type Props = {};
const LinearGraph1 = (props: Props) => {
  const { activeValues } = useActiveValueStore();
  const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
  const [windowsSize, setWindowsSize] = useState(500);
  const [variables, setVariables] = useState([
    { name: "A", value: "", from: "" },
  ]);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [fixedSizeWindows, setFixedSizeWindows] = useState<{
    [key: string]: FixedSizeWindow;
  }>({});

  useEffect(() => {
    if (selectedVariables.length > 0) {
      const initialWindows: { [key: string]: FixedSizeWindow } = {};
      selectedVariables.forEach((variable) => {
        initialWindows[variable] = new FixedSizeWindow(windowsSize);
      });
      setFixedSizeWindows(initialWindows);
    }
  }, [windowsSize, selectedVariables]);

  useEffect(() => {
    if (selectedVariables.length > 0) {
      const timestamp = new Date().toISOString();
      const newDataPoint: DataPoint = { timestamp };

      selectedVariables.forEach((variable) => {
        const variableValue = activeValues.find(
          (a) => a.givenName === variable,
        );
        const newValue = variableValue ? variableValue.value : 0;
        console.log(`new value: ${JSON.stringify(newValue)}`);
        fixedSizeWindows[variable].addValue(newValue);
      });

      const updatedChartData = fixedSizeWindows[selectedVariables[0]]
        .getWindow()
        .map((_, index) => {
          const dataPoint: DataPoint = { timestamp: `T${index}` };
          selectedVariables.forEach((variable) => {
            const windowValues = fixedSizeWindows[variable].getWindow();
            dataPoint[variable] = windowValues[index];
          });
          return dataPoint;
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

          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(1)}
              />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {selectedVariables.map((variable) => (
                <Line
                  key={variable}
                  type="monotone"
                  dataKey={variable}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
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

export default LinearGraph1;
