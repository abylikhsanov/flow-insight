import { create } from "zustand";
import { CALCULATIONS } from "@/constants/calculations.tsx";

type CalculationNode = {
  nodeId: string;
  type: (typeof CALCULATIONS)[number];
};

type CalculationNodeStore = {
  calculationNodes: CalculationNode[];
  addCalculationNode: (nodeId: string, calculationTypeId: string) => void;
  removeCalculationNode: (nodeId: string) => void;
};

export const useCalculationNodesStore = create<CalculationNodeStore>((set) => ({
  calculationNodes: [],
  addCalculationNode: (nodeId: string, calculationTypeId: string) =>
    set((state) => ({
      calculationNodes: [
        ...state.calculationNodes,
        {
          nodeId: nodeId,
          type: CALCULATIONS.find((c) => c.id === calculationTypeId)!,
        },
      ],
    })),
  removeCalculationNode: (nodeId: string) =>
    set((state) => ({
      calculationNodes: state.calculationNodes.filter(
        (node) => node.nodeId !== nodeId,
      ),
    })),
}));
