import "./App.css";
import { useEffect } from "react";
import { Cylinder } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/index";
import GridLayoutComponent from "@/components/grid-layout";
import { useOpcUaNodeStore } from "@/zustand/use-opcua-nodes.ts";

function App() {
  const { opcUaNodes, setOpcUaNodes } = useOpcUaNodeStore();

  {
    /* Discovery of all nodes for display */
  }
  useEffect(() => {
    // Get opcua nodes
    const node1 = {
      nodeId: "2",
      nodeName: "Pressure",
    };
    const node2 = {
      nodeId: "3",
      nodeName: "Pressure water in air",
    };
    const node3 = {
      nodeId: "4",
      nodeName: "Temperature",
    };
    setOpcUaNodes([...[node1, node2, node3]]);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div
        id="navbar"
        className="h-24 flex-shrink-0 w-full border-b-2 bg-primary-foreground"
      >
        <Navbar />
      </div>

      <div className="grid grid-cols-4 flex-grow overflow-hidden">
        <div
          id="sidebar"
          className="col-span-1 justify-center bg-muted h-full overflow-y-auto border-r-2"
        >
          {/* List all nodes discovered from async function and added into OPCUAContext */}
          <div className="flex w-full justify-center mt-2">
            <Button variant="default">Realtime</Button>
            <Button variant="outline">Time-series</Button>
          </div>
          <h2 className="font-bold m-4 text-center">
            Your discovered equipment via OPC UA
          </h2>
          <div className="grid grid-cols-2">
            {opcUaNodes.map((node) => (
              <div
                key={node.nodeId}
                className="flex flex-col items-center my-4 hover:cursor-pointer"
              >
                <Cylinder />
              </div>
            ))}
          </div>
        </div>

        <div
          id="canvas"
          className="col-span-3 h-full overflow-y-auto space-y-3 bg-muted"
        >
          <GridLayoutComponent />

          {/* Map all added calculations (components) and use select with OPCUAContext values for various input */}
        </div>
      </div>
    </div>
  );
}

export default App;
