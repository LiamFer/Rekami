import { Card, Tag, Typography } from "antd";
import { AnimeEpisode } from "../../Types/AnimeEpisode";
import { CalendarOutlined } from "@ant-design/icons";
const { Text } = Typography;

export default function EpisodeCard({ ep }: { ep: AnimeEpisode }) {
  const date = new Date(ep.aired);
  const airedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return (
    <Card style={{ flexGrow: 1 }} styles={{ body: { padding: "12px" } }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tag style={{ borderRadius: "10px", width: "fit-content" }}>
            EP {ep.mal_id}
          </Tag>
          {true && (
            <Tag
              color="orange"
              style={{ borderRadius: "10px", width: "fit-content" }}
            >
              Filler
            </Tag>
          )}
        </div>
        <h3 style={{ margin: 0 }}>{ep.title}</h3>
        <Text type="secondary">
          <CalendarOutlined /> {airedDate}
        </Text>
      </div>
    </Card>
  );
}
