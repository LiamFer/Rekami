import { Card, Tag, Typography } from "antd";
import { AnimeRelation } from "../../Types/AnimeRelation";
const { Text } = Typography;

export default function RelationCard({
  relation,
}: {
  relation: AnimeRelation;
}) {
  return (
    <Card
      style={{ flexGrow: 1, overflow: "hidden" }}
      styles={{ body: { padding: "12px" } }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3
            style={{
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {relation.name}
          </h3>
        </div>
        <h3
          style={{
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Tag
            color="orange"
            style={{ borderRadius: "10px", width: "fit-content" }}
          >
            {relation.type}
          </Tag>
        </h3>
      </div>
    </Card>
  );
}
