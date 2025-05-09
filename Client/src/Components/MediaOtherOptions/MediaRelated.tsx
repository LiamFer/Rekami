import { Row, Col } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import RelationCard from "../RelationCard/RelationCard";

export default function MediaRelated({ animeFull }: { animeFull: FullAnime }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {animeFull.relations.map((r) => (
        <div>
          <h1>{r.relation}</h1>

          <Row gutter={[16, 16]}>
            {r.entry.map((e) => (
              <Col key={e.mal_id} xs={24} sm={12} md={6}>
                <RelationCard relation={e}></RelationCard>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
