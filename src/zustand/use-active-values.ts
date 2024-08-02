import { create } from "zustand";

type ActiveValue = {
  givenName: string;

  value: number;
};

type ActiveValueStore = {
  activeValues: ActiveValue[];
  setActiveValues: (values: ActiveValue[]) => void;
  updateActiveValue: (givenName: string, newValue: number) => void;
};

export const useActiveValueStore = create<ActiveValueStore>((set) => ({
  activeValues: [],
  setActiveValues: (values) => set({ activeValues: values }),
  updateActiveValue: (givenName, newValue) =>
    set((state) => {
      const existingValueIndex = state.activeValues.findIndex(
        (value) => value.givenName === givenName,
      );

      if (existingValueIndex !== -1) {
        // Update existing value
        const updatedValues = [...state.activeValues];
        updatedValues[existingValueIndex].value = newValue;
        return { activeValues: updatedValues };
      } else {
        // Add new value
        return {
          activeValues: [...state.activeValues, { givenName, value: newValue }],
        };
      }
    }),
}));
