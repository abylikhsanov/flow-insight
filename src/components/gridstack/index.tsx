import React, { useEffect, useRef, useState } from "react";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import { useOpcuaContext } from "@/context/opcua-context";

const GridStackComponent = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { opcuaNodes } = useOpcuaContext();
  const [grid, setGrid] = useState<GridStack | null>(null);

  useEffect(() => {
    const gridInstance = GridStack.init();
    setGrid(gridInstance);
    return () => {
      gridInstance.destroy(false);
    };
  }, []);

  return (
    <div className="App">
      <div className="grid-stack">
        <div
          className="grid-stack-item border-dark"
          data-gs-width="40"
          data-gs-height="40"
        >
          <div className="grid-stack-item-content">Item 1</div>
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">Item 2</div>
        </div>
        <div
          className="grid-stack-item border-dark"
          data-gs-width="4"
          data-gs-height="4"
        >
          <div className="grid-stack-item-content">Item 3</div>
        </div>
      </div>
    </div>
  );
};

export default GridStackComponent;
