// @flow
import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CALCULATIONS } from "@/constants/calculations";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { useOpcuaContext } from "@/context/opcua-context";

type Props = {};
const CalculationScrollArea = ({}: Props) => {
  const { calculationIds, setCalculationIds } = useOpcuaContext();
  return (
    <ScrollArea className="flex w-full my-2 whitespace-nowrap">
      <div className="flex w-max space-x-2 p-2">
        {CALCULATIONS.map((calculation, index) => (
          <div
            key={index}
            onClick={() =>
              setCalculationIds([...calculationIds, calculation.id])
            }
            className="flex flex-col space-y-2 p-1 border-b-2 hover:cursor-pointer hover:bg-muted"
          >
            <span className="text-sm text-muted-foreground">
              {calculation.name}
            </span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CalculationScrollArea;
