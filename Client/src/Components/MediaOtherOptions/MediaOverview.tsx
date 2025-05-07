import { Button, Typography } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import { LinkOutlined } from "@ant-design/icons";

const { Text } = Typography;
export default function MediaOverview({ animeFull }: { animeFull: FullAnime }) {
  return (
    <div>
      <h1>Background</h1>
      <Text type="secondary">{animeFull.background}</Text>
      <h1>Where to Watch</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {animeFull.streaming.map((source) => (
          <a href={source.url} target="_blank">
            <Button icon={<LinkOutlined />}>{source.name}</Button>
          </a>
        ))}
      </div>
    </div>
  );
}
