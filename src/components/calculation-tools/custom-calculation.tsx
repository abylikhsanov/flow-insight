"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOpcuaContext } from "@/context/opcua-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useActiveValueStore } from "@/zustand/use-active-values";

{
  /* Use backend to get values for the selected opc ua node */
}

const CustomCalculation = () => {
  const { activeValues } = useActiveValueStore();
  const [variables, setVariables] = useState([
    { name: "A", value: "", from: "" },
  ]);
  const [formula, setFormula] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSelectChange = (givenName: string, index: number) => {
    const newVariables = [...variables];
    newVariables[index].from = givenName;
    newVariables[index].value = activeValues
      .find((f) => f.givenName === givenName)!
      .value.toString();
    setVariables(newVariables);
  };

  const handleFormulaChange = (e: any) => {
    setFormula(e.target.value);
  };

  const addVariable = () => {
    const newVariable = {
      name: String.fromCharCode(65 + variables.length),
      value: "",
      from: "",
    }; // Generate next letter
    setVariables([...variables, newVariable]);
  };

  const evaluateFormula = () => {
    try {
      let formulaWithValues = formula;
      variables.forEach((variable) => {
        // Find the corresponding formula result or OPC UA node value
        const activeValue = activeValues.find(
          (av) => av.givenName === variable.from,
        );

        const actualValue = activeValue?.value.toString() || "0";

        formulaWithValues = formulaWithValues.replace(
          variable.name,
          actualValue,
        );
      });
      setResult(eval(formulaWithValues)); // Evaluate the formula (be cautious with eval)
    } catch (error) {
      console.error("Invalid formula", error);
      setResult(null);
    }
  };

  useEffect(() => {
    evaluateFormula();
  }, [activeValues, variables]);

  return (
    <Card>
      <CardHeader>Custom calculation</CardHeader>
      <CardContent>
        <div className="flex flex-col p-4 space-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="font-bold">{variable.name}</span>
              <Select
                onValueChange={(value) => handleSelectChange(value, index)}
              >
                <SelectTrigger>
                  <SelectValue>{variable.from || "Select an item"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <div>
                    <strong>Active values</strong>
                    {activeValues.map((activeValue, idx) => (
                      <SelectItem
                        key={`formula-${idx}`}
                        value={activeValue.givenName}
                      >
                        {activeValue.givenName}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button onClick={addVariable} className="self-start mt-4">
            Add Variable
          </Button>
          <Input
            type="text"
            value={formula}
            onChange={handleFormulaChange}
            placeholder="Type your formula (e.g., A*2 + B)"
            className="mt-4"
          />
          <Button onClick={evaluateFormula} className="self-start mt-4">
            Calculate
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <p>Calculation result</p>
          <p>{result}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomCalculation;
