import type { StatisticProps } from "antd";
import { Statistic } from "antd";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="." />
);

export default function MediaStatistic({ title, value }) {
  return (
    <Statistic
      valueStyle={{ fontSize: "2.5rem" }}
      title={title}
      value={value}
      formatter={formatter}
    />
  );
}
