// @flow
import * as React from "react";
import { ReactNode } from "react";

type Props = {
  component: ReactNode;
};
const CalculationNode = ({ component }: Props) => {
  return <React.Fragment>{component}</React.Fragment>;
};

export default CalculationNode;
