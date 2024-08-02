// @flow
import * as React from "react";
import { useOpcuaContext } from "@/context/opcua-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Props = {};
const HumidAir = (props: Props) => {
  const { opcuaNodes, opcuaLabelNodes, activeValues } = useOpcuaContext();
  const [pressure, setPressure] = useState<number | null>(null);
  const [pressureWaterAir, setPressureWaterAir] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [pressureId, setPressureId] = useState<string | null>(null);
  const [pressureWaterAirId, setPressureWaterAirId] = useState<string | null>(
    null,
  );
  const [temperatureId, setTemperatureId] = useState<string | null>(null);

  {
    /* Read selected IDs from opc ua client and update the local variables to constantly calculate values */
  }

  const handleSelectPressureChange = (name: string) => {
    //setPressure(value);
    const isFormula = activeValues.some(
      (formula) => formula.givenName === name,
    );
    if (isFormula) {
      console.log("Selected formula result:", name);
    } else {
      console.log("Selected OPC UA node:", name);
    }
  };

  return (
    <Card className="p-4">
      <CardTitle>Calculation for Humid Air</CardTitle>
      <CardContent>
        <div className="flex flex-col justify-center w-full my-4">
          <div className="flex justify-between items-center space-y-3">
            <p>Select equipment for pressure (pa)</p>
            <Select onValueChange={handleSelectPressureChange}>
              <SelectTrigger className="w-[180px] my-2">
                <SelectValue>{"Select an item for Pressure"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <div>
                  Formula Results
                  {activeValues.map((formula, index) => (
                    <SelectItem
                      key={`formula-${index}`}
                      value={formula.givenName}
                    >
                      {formula.givenName}
                    </SelectItem>
                  ))}
                </div>
                <div>---</div>
                <div>
                  OPC UA Nodes
                  {opcuaLabelNodes.map((node, index) => (
                    <SelectItem key={`node-${index}`} value={node.nodeName}>
                      {node.nodeName}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between gap-3">
            <p>Select equipment for pressure in water air (pa)</p>
            <Select onValueChange={(value) => setPressureWaterAirId(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pressure in water" />
              </SelectTrigger>
              <SelectContent>
                {opcuaNodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.nodeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidAir;
