// @flow
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Props = {
  calculationId: string;
  name: string;
  onAddCalculationId: (id: string) => void;
};
const CalculationLabel = ({
  calculationId,
  name,
  onAddCalculationId,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p>{name}</p>
      </PopoverTrigger>
      <PopoverContent>
        <Button
          className="w-full"
          onClick={() => onAddCalculationId(calculationId)}
        >
          Add
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default CalculationLabel;
