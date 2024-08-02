import HumidAir from "@/components/calculation-tools/humid-air";
import CustomCalculation from "@/components/calculation-tools/custom-calculation";

export const CALCULATIONS = [
  {
    id: "0",
    name: "Custom calculation",
    description: "Create your own custom calculation",
    component: <CustomCalculation />,
  },
  {
    id: "1",
    name: "Humid Air",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "2",
    name: "BOD Calculator",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "4",
    name: "Total Solids in Water Calculator",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "5",
    name: "Compressor power",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "6",
    name: "Gas expander available energy",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "7",
    name: "Antoine law : Saturation pressure ",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
  {
    id: "8",
    name: "Horizontal tank volume calculator",
    description:
      "Calculate humid air with know pressure, pressure water in air and temperature",
    component: <HumidAir />,
  },
];
