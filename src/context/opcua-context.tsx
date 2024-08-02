"use client";
import React, { useState } from "react";

export interface OpcuaNode {
  id: string;
  nodeName: string;
  givenName: string;
}

export interface OpcuaLabelNode {
  id: string;
  nodeName: string;
}

type InitialProps = {
  opcuaNodes: OpcuaNode[];
  setOpcuaNodes: React.Dispatch<React.SetStateAction<OpcuaNode[]>>;
  opcuaLabelNodes: OpcuaLabelNode[];
  setOpcuaLabelNodes: React.Dispatch<React.SetStateAction<OpcuaLabelNode[]>>;
  activeValues: { givenName: string; value: number }[];
  setActiveValues: React.Dispatch<
    React.SetStateAction<{ givenName: string; value: number }[]>
  >;
  calculationIds: string[];
  setCalculationIds: React.Dispatch<React.SetStateAction<string[]>>;
  graphIds: string[];
  setGraphIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const InitialValues: InitialProps = {
  opcuaNodes: [],
  setOpcuaNodes: () => undefined,
  opcuaLabelNodes: [],
  setOpcuaLabelNodes: () => undefined,
  activeValues: [],
  setActiveValues: () => undefined,
  calculationIds: [],
  setCalculationIds: () => undefined,
  graphIds: [],
  setGraphIds: () => undefined,
};

const opcuaContext = React.createContext(InitialValues);

const { Provider } = opcuaContext;

export const OpcuaContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opcuaNodes, setOpcuaNodes] = useState<OpcuaNode[]>(
    InitialValues.opcuaNodes,
  );
  const [opcuaLabelNodes, setOpcuaLabelNodes] = useState<OpcuaLabelNode[]>(
    InitialValues.opcuaLabelNodes,
  );
  const [activeValues, setActiveValues] = useState<
    { givenName: string; value: number }[]
  >(InitialValues.activeValues);

  const [calculationIds, setCalculationIds] = useState<string[]>([]);
  const [graphIds, setGraphIds] = useState<string[]>([]);

  const values = {
    opcuaNodes,
    setOpcuaNodes,
    activeValues,
    opcuaLabelNodes,
    setOpcuaLabelNodes,
    setActiveValues,
    calculationIds,
    setCalculationIds,
    graphIds,
    setGraphIds,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useOpcuaContext = () => {
  return React.useContext(opcuaContext);
};
