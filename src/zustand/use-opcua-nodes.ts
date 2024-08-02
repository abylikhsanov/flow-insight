import { create } from "zustand";

type OpcUaNode = {
  nodeId: string;
  nodeName: string;
};

type OpcUaNodeStore = {
  opcUaNodes: OpcUaNode[];
  setOpcUaNodes: (opcUaNodes: OpcUaNode[]) => void;
  addOpcUaNode: (id: string, nodeName: string) => void;
};

export const useOpcUaNodeStore = create<OpcUaNodeStore>((set) => ({
  opcUaNodes: [],
  setOpcUaNodes: (opcUaNodes: OpcUaNode[]) =>
    set(() => ({
      opcUaNodes: opcUaNodes,
    })),
  addOpcUaNode: (nodeId: string, nodeName: string) =>
    set((state) => ({
      opcUaNodes: [...state.opcUaNodes, { nodeId: nodeId, nodeName: nodeName }],
    })),
}));
