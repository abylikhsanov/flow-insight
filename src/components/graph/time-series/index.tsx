"use client";
import "react-resizable/css/styles.css";
import { useOpcUaNodeStore } from "@/zustand/use-opcua-nodes.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Chart from "@/components/graph/time-series/chart.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { CheckedState } from "@radix-ui/react-checkbox";

const TimeSeriesGraph = () => {
  const { opcUaNodes } = useOpcUaNodeStore();
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2021-06-06");
  const [endDate, setEndDate] = useState("2024-06-06");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  const loadData = useCallback(
    async (updatedNodeIds: string[]) => {
      console.log(`Updating: ${updatedNodeIds.length}`);
      if (updatedNodeIds.length < 1) {
        setData([]);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/timeseries/${updatedNodeIds[0]}/${startDate.replace(
            /-/g,
            "/",
          )}/${endDate.replace(/-/g, "/")}`,
        );
        console.log(`Response: ${import.meta.env.VITE_BACKEND_URI}`);
        const data = await response.json();
        const formattedData = data.map(([date, value]: [string, number]) => ({
          x: new Date(date).getTime(), // Convert date to timestamp
          y: value,
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    },
    [startDate, endDate],
  );

  useEffect(() => {
    console.log(`Container ref: ${containerRef.current}`);
    if (!containerRef.current) return;

    const updateDimensions = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          console.log(
            `width: ${entry.contentRect.width}, height: ${entry.contentRect.height}`,
          );
        }
        if (
          entry.contentRect.width === dimensions.width &&
          entry.contentRect.height === dimensions.height
        ) {
          return;
        }
        console.log(
          `Changing, current width: ${dimensions.width}, height: ${dimensions.height}`,
        );

        return;
        setDimensions({
          width: entry.contentRect.width, // Adjust with padding/margin
          height: entry.contentRect.height, // Adjust with padding/margin
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  const handleNodeCheck = (checked: boolean, nodeId: string) => {
    if (checked) {
      // Add the nodeId if checked and not already in the list
      setSelectedNodeIds((prevState) => {
        if (!prevState.includes(nodeId)) {
          const updatedNodeIds = [...prevState, nodeId];
          console.log(`Updated NodeIds: ${updatedNodeIds}`);
          loadData(updatedNodeIds);
          return updatedNodeIds;
        }
        return prevState;
      });
    } else {
      // Remove the nodeId if unchecked
      setSelectedNodeIds((prevState) => {
        const updatedNodeIds = prevState.filter((id) => id !== nodeId);
        console.log(`Updated NodeIds: ${updatedNodeIds}`);
        loadData(updatedNodeIds);
        return updatedNodeIds;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col border-dark border-2 overflow-hidden"
    >
      <div className="flex justify-between mb-4">
        <div className="flex flex-col text-sm">
          {opcUaNodes.map((node, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between space-x-2 items-center">
                <p>{node.nodeName}</p>
                <Checkbox
                  onCheckedChange={(checked: boolean) =>
                    handleNodeCheck(checked, node.nodeId)
                  }
                />
              </div>
              <Separator />
            </div>
          ))}
        </div>
        <Chart
          data={data}
          height={dimensions.height}
          width={dimensions.width}
        />
      </div>
      <div className="flex flex-col space-y-3 mt-4">
        <p>Calculation area</p>
      </div>
    </div>
  );
};

export default TimeSeriesGraph;
