import React from "react";
import CalculationScrollArea from "@/components/calculation-tools/calculation-scroll-area";
import { cn } from "@/lib/utils";
import GraphsScrollArea from "@/components/graph/graphs-scroll-area";

const Navbar = () => {
  const [selected, setSelected] = React.useState<"calculations" | "graphs">(
    "calculations",
  );

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-1 border-r-2">Logo</div>
      <div className="col-span-3 flex flex-col text-center">
        <div className="flex space-x-2 w-full justify-center">
          <p
            className={cn(
              "text-xl mt-2 hover:cursor-pointer hover:text-muted-foreground",
              selected === "calculations" && "font-bold underline",
            )}
            onClick={() => setSelected("calculations")}
          >
            Calculations
          </p>
          <p className="text-xl mt-2"> / </p>
          <p
            className={cn(
              "text-xl mt-2 hover:cursor-pointer hover:text-muted-foreground",
              selected === "graphs" && "font-bold underline",
            )}
            onClick={() => setSelected("graphs")}
          >
            Graphs
          </p>
        </div>
        <div
          className={cn(
            "relative flex-row space-x-2 items-center w-full",
            selected === "graphs" && "hidden",
          )}
        >
          <CalculationScrollArea />
        </div>
        <div
          className={cn(
            "relative flex-row space-x-2 items-center w-full",
            selected === "calculations" && "hidden",
          )}
        >
          <GraphsScrollArea />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
