import { create } from "zustand";
import { GRAPHS } from "@/constants/garphs.tsx";

type GraphNode = {
  nodeId: string;
  type: (typeof GRAPHS)[number];
};

type GraphNodeStore = {
  graphNodes: GraphNode[];
  addGraphNode: (nodeId: string, graphTypeId: string) => void;
  removeGraphNode: (nodeId: string) => void;
};

export const useGraphNodesStore = create<GraphNodeStore>((set) => ({
  graphNodes: [],
  addGraphNode: (nodeId: string, graphTypeId: string) =>
    set((state) => ({
      graphNodes: [
        ...state.graphNodes,
        {
          nodeId: nodeId,
          type: GRAPHS.find((graph) => graph.id === graphTypeId)!,
        },
      ],
    })),
  removeGraphNode: (nodeId: string) =>
    set((state) => ({
      graphNodes: state.graphNodes.filter((node) => node.nodeId !== nodeId),
    })),
}));
