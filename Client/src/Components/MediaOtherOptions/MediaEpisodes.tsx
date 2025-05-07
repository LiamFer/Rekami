import { Card, Tag } from "antd";
import { useAnimeEpisodes } from "../../Hooks/useAnimeEpisodes";
import { FullAnime } from "../../Types/FullAnime";

export default function MediaEpisodes({ animeFull }: { animeFull: FullAnime }) {
  const { loading, episodes } = useAnimeEpisodes(animeFull.mal_id);
  return (
    <div>
      <h1>Episodes</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {episodes?.map((ep) => (
          <Card
            style={{ flexGrow: 1 }}
            title={
              <>
                <Tag>EP {ep.mal_id}</Tag>
                {ep.title}
              </>
            }
          ></Card>
        ))}
      </div>
    </div>
  );
}
