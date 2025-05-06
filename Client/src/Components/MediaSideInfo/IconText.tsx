import { Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

interface IconTextProps {
  icon: ReactNode;
  text: string;
}

export default function IconText({ icon, text }: IconTextProps) {
  return (
    <Text style={{ fontSize: "1rem", fontWeight: 600 }} type="secondary">
      <span style={{ marginRight: 6 }}>{icon}</span>
      {text}
    </Text>
  );
}
