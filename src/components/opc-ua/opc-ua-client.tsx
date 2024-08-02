"use client";
import { Car } from "lucide-react";

{
  /*
  This is OPC UA client to get the node
  Use this after discovering all nodes and
  map them one by one using this component
*/
}
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataValue } from "node-opcua-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormulasList from "@/components/formula/formulas-list";
import { useActiveValueStore } from "@/zustand/use-active-values";

type Props = {
  endpointUrl: string;
  nodeId: string;
  nodeName: string;
  givenName: string;
  useFakeData?: boolean;
};
const OpcUaClient = ({
  endpointUrl,
  nodeId,
  nodeName,
  givenName,
  useFakeData = false,
}: Props) => {
  const { activeValues, setActiveValues, updateActiveValue } =
    useActiveValueStore();
  const [value, setValue] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [formulas, setFormulas] = useState<any[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    if (useFakeData) {
      const interval = setInterval(() => {
        const simulatedValue = {
          value: { value: Math.random() * 10 + 90 },
          sourceTimestamp: new Date(),
          serverTimestamp: new Date(),
        } as DataValue;
        setPrevValue(value);
        setValue(simulatedValue.value.value);
        updateActiveValue(`${givenName}/raw`, simulatedValue.value.value);
        setTimeElapsed(
          simulatedValue.sourceTimestamp!.getTime() * 1000 - timeElapsed,
        );
        console.log(
          `Setting prevValue: ${JSON.stringify(prevValue)}, time: ${JSON.stringify(timeElapsed)}`,
        );
      }, 200);
      return () => clearInterval(interval);
    }
  }, [endpointUrl, nodeId, useFakeData]);

  useEffect(() => {
    setHistory((prevHistory) => {
      const updatedHistory = [...history, value];
      if (history.length > 100) {
        history.shift();
      }
      return updatedHistory;
    });
  }, [value]);

  useEffect(() => {
    const results = formulas.map((formula: any) => {
      const params = {
        currentValue: value,
        prevValue,
        timeElapsed,
        history,
        ...formula.userParams,
      };

      return {
        givenName: `${givenName}/${formula.name}`,
        value: formula.formula(params),
      };
    });

    results.forEach((result) => {
      updateActiveValue(result.givenName, result.value);
    });
  }, [formulas, value]);

  const onAddFormula = useCallback((formula: any) => {
    setFormulas((prevFormulas) => [...prevFormulas, formula]);
  }, []);

  const filteredResults = useMemo(() => {
    return activeValues.filter(
      (formulaResult) => formulaResult.givenName.split("/")[0] === givenName,
    );
  }, [activeValues, givenName]);

  return (
    <Card>
      <CardTitle className="text-center my-2">{givenName}</CardTitle>
      <CardContent>
        <div className="flex flex-col p-2 space-y-2">
          {error ? (
            <div>Error: {error}</div>
          ) : value ? (
            <div>
              <p>Equipment: {nodeName}</p>
              <p>Id: {nodeId}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
          <FormulasList onAddFormula={onAddFormula} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col w-full p-2 space-y-2">
          {filteredResults.map((result: any, index: number) => (
            <div key={index} className="flex w-full justify-between">
              <p>{result.givenName}</p>
              <p>{result.value}</p>
              <Button>Create alert</Button>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(OpcUaClient);
