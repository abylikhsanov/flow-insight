"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FORMULAS } from "@/constants/formulas";
import { useState } from "react";

type Props = {
  onAddFormula: (formula: any) => void;
};
const FormulasList = ({ onAddFormula }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFormula, setSelectedFormula] = useState<any>(null);
  const [additionalParams, setAdditionalParams] = useState<any>({});

  const handleFormulaSelect = (formula: any) => {
    setSelectedFormula(formula);
    const userProvidedParams = formula.params.filter(
      (param: any) => param.userProvided,
    );
    if (userProvidedParams.length === 0) {
      onAddFormula({ ...formula, additionalParams: {} });
      setOpen(false);
      setSelectedFormula(null);
    } else {
      setAdditionalParams({});
    }
  };

  const handleParamChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    param: string,
  ) => {
    setAdditionalParams({
      ...additionalParams,
      [param]: parseFloat(e.target.value),
    });
  };

  const handleAddFormula = () => {
    onAddFormula({ ...selectedFormula, additionalParams });
    setOpen(false);
    setSelectedFormula(null);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add calculation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select formula</DialogTitle>
          <DialogDescription>
            Choose one of the formulas to apply for this equipment value
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          {!selectedFormula ? (
            FORMULAS.map((formula) => (
              <div
                key={formula.id}
                onClick={() => handleFormulaSelect(formula)}
                className="w-full py-2 text-center text-black text-md border-2 rounded-lg hover:cursor-pointer hover:bg-muted-foreground"
              >
                {formula.name}
              </div>
            ))
          ) : (
            <div>
              {selectedFormula.params
                .filter((param: any) => param.userProvided)
                .map((param: any) => (
                  <div key={param.name} className="mb-2">
                    <label>{param.name}</label>
                    <input
                      type="number"
                      onChange={(e) => handleParamChange(e, param.name)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              <Button onClick={handleAddFormula}>Add</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormulasList;
