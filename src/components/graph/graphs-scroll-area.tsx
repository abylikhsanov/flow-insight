import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GRAPHS } from "@/constants/garphs";
import { useGraphNodesStore } from "@/zustand/use-graph-nodes.ts";

const GraphsScrollArea = () => {
  const { addGraphNode } = useGraphNodesStore();
  return (
    <ScrollArea className="flex w-full my-2 whitespace-nowrap">
      <div className="flex w-max space-x-2 p-2">
        {GRAPHS.map((graph, index) => (
          <div
            key={index}
            onClick={() => addGraphNode("1", graph.id)}
            className="flex flex-col space-y-2 p-1 border-b-2 hover:cursor-pointer hover:bg-muted"
          >
            <span className="text-sm text-muted-foreground">{graph.name}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default GraphsScrollArea;
