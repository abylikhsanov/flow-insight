export const FORMULAS = [
  {
    id: 1,
    name: "Rate of change",
    params: [
      { name: "currentValue", userProvided: false },
      { name: "prevValue", userProvided: false },
      { name: "timeElapsed", userProvided: false },
    ],
    formula: ({
      currentValue,
      prevValue,
      timeElapsed,
    }: {
      currentValue: number;
      prevValue: number;
      timeElapsed: number;
    }) => (currentValue - prevValue) / timeElapsed,
  },
  {
    id: 2,
    name: "Delta Value",
    params: [
      { name: "currentValue", userProvided: false },
      { name: "prevValue", userProvided: false },
    ],
    formula: ({
      currentValue,
      prevValue,
    }: {
      currentValue: number;
      prevValue: number;
    }) => currentValue - prevValue,
  },
  {
    id: 3,
    name: "Average Value",
    params: [
      { name: "currentValue", userProvided: false },
      { name: "prevValue", userProvided: false },
    ],
    formula: ({
      currentValue,
      prevValue,
    }: {
      currentValue: number;
      prevValue: number;
    }) => (currentValue + prevValue) / 2,
  },
  {
    id: 4,
    name: "Moving Average",
    params: [
      { name: "currentValue", userProvided: false },
      { name: "window", userProvided: true },
      { name: "history", userProvided: false },
    ],
    formula: ({
      currentValue,
      window,
      history,
    }: {
      currentValue: number;
      window: number;
      history: number[];
    }) => {
      const updatedHistory = [...history, currentValue];
      if (updatedHistory.length > window) {
        updatedHistory.shift();
      }
      const sum = updatedHistory.reduce((acc, val) => acc + val, 0);
      return sum / updatedHistory.length;
    },
  },
  {
    id: 5,
    name: "Mean (Average)",
    params: [{ name: "history", userProvided: false }],
    formula: ({ history }: { history: number[] }) =>
      history.reduce((a, b) => a + b, 0) / history.length,
  },
  {
    id: 6,
    name: "Standard Deviation",
    params: [{ name: "history", userProvided: false }],
    formula: ({ history }: { history: number[] }) => {
      const mean = history.reduce((a, b) => a + b, 0) / history.length;
      return Math.sqrt(
        history.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) /
          history.length,
      );
    },
  },
  {
    id: 7,
    name: "Variance",
    params: [{ name: "history", userProvided: false }],
    formula: ({ values }) => {
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      return (
        values.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / values.length
      );
    },
  },
  {
    id: 8,
    name: "Median",
    params: [{ name: "history", userProvided: false }],
    formula: ({ values }) => {
      const sortedValues = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);
      return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    },
  },
  {
    id: 9,
    name: "Cumulative Sum",
    params: [{ name: "history", userProvided: false }],
    formula: ({ values }) => values.reduce((a, b) => a + b, 0),
  },
  {
    id: 10,
    name: "PID Control",
    params: [
      "Kp",
      "Ki",
      "Kd",
      "setPoint",
      "processVariable",
      "integral",
      "prevError",
      "dt",
    ],
    formula: ({
      Kp,
      Ki,
      Kd,
      setPoint,
      processVariable,
      integral,
      prevError,
      dt,
    }) => {
      const error = setPoint - processVariable;
      const derivative = (error - prevError) / dt;
      integral += error * dt;
      return Kp * error + Ki * integral + Kd * derivative;
    },
  },
  {
    id: 11,
    name: "Energy Balance",
    params: ["mass", "specificHeat", "deltaTemp"],
    formula: ({ mass, specificHeat, deltaTemp }) =>
      mass * specificHeat * deltaTemp,
  },
  {
    id: 12,
    name: "Flow Rate",
    params: ["area", "velocity"],
    formula: ({ area, velocity }) => area * velocity,
  },
  {
    id: 13,
    name: "Pressure Drop",
    params: ["frictionFactor", "length", "diameter", "density", "velocity"],
    formula: ({ frictionFactor, length, diameter, density, velocity }) =>
      frictionFactor *
      (length / diameter) *
      ((density * Math.pow(velocity, 2)) / 2),
  },
  {
    id: 14,
    name: "Pump Work",
    params: ["flowRate", "pressureDifference", "efficiency"],
    formula: ({ flowRate, pressureDifference, efficiency }) =>
      (flowRate * pressureDifference) / efficiency,
  },
  {
    id: 15,
    name: "Reaction Rate",
    params: [
      "rateConstant",
      "concentrationA",
      "concentrationB",
      "orderA",
      "orderB",
    ],
    formula: ({
      rateConstant,
      concentrationA,
      concentrationB,
      orderA,
      orderB,
    }) =>
      rateConstant *
      Math.pow(concentrationA, orderA) *
      Math.pow(concentrationB, orderB),
  },
  {
    id: 16,
    name: "Equilibrium Constant",
    params: [
      "concentrationC",
      "concentrationD",
      "concentrationA",
      "concentrationB",
      "orderC",
      "orderD",
      "orderA",
      "orderB",
    ],
    formula: ({
      concentrationC,
      concentrationD,
      concentrationA,
      concentrationB,
      orderC,
      orderD,
      orderA,
      orderB,
    }) =>
      (Math.pow(concentrationC, orderC) * Math.pow(concentrationD, orderD)) /
      (Math.pow(concentrationA, orderA) * Math.pow(concentrationB, orderB)),
  },
  {
    id: 17,
    name: "Upper Control Limit (UCL)",
    params: ["mean", "std"],
    formula: ({ mean, std }) => mean + 3 * std,
  },
  {
    id: 18,
    name: "Lower Control Limit (LCL)",
    params: ["mean", "std"],
    formula: ({ mean, std }) => mean - 3 * std,
  },
  {
    id: 19,
    name: "Fourier Transform",
    params: ["signal"],
    formula: ({ signal }) => {
      // Implement a simple Fourier Transform (not optimized for performance)
      const N = signal.length;
      return Array.from({ length: N }, (_, k) => {
        return signal.reduce((sum, x_n, n) => {
          return (
            sum +
            x_n * Math.cos((2 * Math.PI * k * n) / N) -
            x_n * Math.sin((2 * Math.PI * k * n) / N)
          );
        }, 0);
      });
    },
  },
  {
    id: 20,
    name: "Root Mean Square (RMS)",
    params: ["values"],
    formula: ({ values }) =>
      Math.sqrt(values.reduce((sum, x) => sum + x * x, 0) / values.length),
  },
];
