import { Card, Tag } from "antd";
import { AnimeRelation } from "../../Types/AnimeRelation";
import { useNavigate } from "react-router-dom";

export default function RelationCard({
  relation,
}: {
  relation: AnimeRelation;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (relation.type == "anime") {
      navigate(`/media/${relation.mal_id}`);
    }
  };

  return (
    <Card
      style={{ flexGrow: 1, overflow: "hidden",cursor: relation.type == "anime" ? "pointer" : undefined }}
      styles={{ body: { padding: "12px" } }}
      onClick={handleClick}
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
