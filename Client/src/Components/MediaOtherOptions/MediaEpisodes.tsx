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
          <Card style={{ flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
