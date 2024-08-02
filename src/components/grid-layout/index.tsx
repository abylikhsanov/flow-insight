import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CALCULATIONS } from "@/constants/calculations";
import CalculationNode from "@/components/calculation-tools/calculation-node";
import { GRAPHS } from "@/constants/garphs";
import { useCalculationNodesStore } from "@/zustand/use-calculations-nodes.ts";
import { useGraphNodesStore } from "@/zustand/use-graph-nodes.ts";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayoutComponent: React.FC = () => {
  const { calculationNodes } = useCalculationNodesStore();
  const { graphNodes } = useGraphNodesStore();
  const [layout, setLayout] = useState<any>([]);

  useEffect(() => {
    const calcNodeLayout = calculationNodes.map((node, index) => ({
      i: `${node.nodeId}-calculation`,
      x: (index % 4) * 3,
      y: Math.floor(index / 4) * 3 + Math.ceil(calculationNodes.length / 4) * 3,
      w: 4,
      h: 4,
    }));

    const graphNodeLayout = graphNodes.map((node, index) => ({
      i: `${node.nodeId}-graph`,
      x: (index % 4) * 3,
      y: Math.floor(index / 4) * 3,
      w: 3,
      h: 3,
    }));

    setLayout((prevLayout: any) => [
      ...prevLayout.filter(
        (item: any) =>
          calculationNodes.find(
            (node) => `${node.nodeId}-calculation` === item.i,
          ) || graphNodes.find((node) => `${node.nodeId}-graph` === item.i),
      ),
      ...calcNodeLayout,
      ...graphNodeLayout,
    ]);
  }, [calculationNodes, graphNodes]);

  return (
    <GridLayout
      className="layout"
      layout={layout}
      width={1200}
      rowHeight={30}
      verticalCompact={true}
      compactType={"vertical"}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
      draggableHandle=".drag-handle"
    >
      {calculationNodes.map((node) => (
        <div
          key={`${node.nodeId}-calculation`}
          data-grid={layout.find(
            (l: any) => l.i === `${node.nodeId}-calculation`,
          )}
        >
          <CalculationNode
            key={node.nodeId}
            component={
              CALCULATIONS.find((c) => c.id === node.nodeId)!.component
            }
          />
        </div>
      ))}

      {graphNodes.map((node) => (
        <div
          key={`${node.nodeId}-graph`}
          data-grid={layout.find((l: any) => l.i === `${node.nodeId}-graph`)}
          className="grid-item bg-white rounded-2xl p-4"
        >
          <div className="drag-handle">Move</div> {/* Add a drag handle */}
          <CalculationNode
            key={node.nodeId}
            component={GRAPHS.find((c) => c.id === node.nodeId)!.component}
          />
        </div>
      ))}
    </GridLayout>
  );
};

export default GridLayoutComponent;
