import React, { ReactNode, useEffect, useRef } from "react";
import { GridStackNode, GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import OpcUaClient from "@/components/opc-ua/opc-ua-client";

type Props = {
  children: ReactNode;
  grid: GridStack;
};

const GridStackItem: React.FC<Props> = ({ children, grid }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemElement = itemRef.current;
    if (!itemElement) return;

    const widget: GridStackNode = {
      el: itemElement,
    };

    grid.addWidget(widget);

    return () => {
      grid.removeWidget(itemElement);
    };
  }, [grid, children]);

  return (
    <div ref={itemRef} className="grid-stack-item">
      <div className="grid-stack-item-content w-96 h-96">{children}</div>
    </div>
  );
};

export default GridStackItem;
