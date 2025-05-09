import { FullAnime } from "../../Types/FullAnime";
import RelationCard from "../RelationCard/RelationCard";

export default function MediaRelated({ animeFull }: { animeFull: FullAnime }) {
  return (
    <div>
      {animeFull.relations.map((r) => (
        <div>
          {r.relation}
          <div>
            {r.entry.map((e) => (
              <RelationCard relation={e}></RelationCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
