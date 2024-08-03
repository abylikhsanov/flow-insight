import { useEffect, useId, useState } from "react";
import { AxisTickStrategies, lightningChart, Themes } from "@arction/lcjs";

type Props = {
  data: { x: string; y: number }[];
  width: number;
  height: number;
};
const Chart = ({ data, width, height }: Props) => {
  const id = useId();
  const [chart, setChart] = useState<any>(undefined);

  // Create chart just once during lifecycle of component.
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) return;
    const lc = lightningChart({
      license:
        "0002-n4og2qUEgC6VgJvI1q8/aqe6hqXfKwCLIOOxHIgwgZiT1g4X529OLq7Qtbgve7sJrvgeOl7HcTSHb1/Y+RjhShb/-MEQCIEa3i+fOlLW4WKbQ2wNSu0PG0mWEK0agBgFqenq8XG2BAiB6H8X14CvUnu5vd+SpvMYtJkka1/HGxZxvWDNDrQL0tw==",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd.",
      },
    });
    const chart = lc.ChartXY({
      theme: Themes.light,
      container,
    });
    chart.getDefaultAxisX().setTickStrategy(AxisTickStrategies.DateTime);
    const axisXDefault = chart.getDefaultAxisX();
    const axisYDefault = chart.getDefaultAxisY();
    const lineSeries = chart.addLineSeries({
      dataPattern: { pattern: "ProgressiveX" },
    });
    setChart({ chart, lineSeries });
    return () => {
      // Destroy chart when component lifecycle ends.
      lc.dispose();
    };
  }, [id]);

  // Update line series data whenever data prop changes.
  useEffect(() => {
    console.log(`data: ${data}`);
    if (!chart || !data) return;
    chart.lineSeries.clear().add(data);
  }, [chart, data]);

  return (
    <div id={id} style={{ width: `${width}px`, height: `${height}px` }}></div>
  );
};

export default Chart;
