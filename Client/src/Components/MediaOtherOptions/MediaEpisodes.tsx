import { Row, Col } from "antd";
import { useAnimeEpisodes } from "../../Hooks/useAnimeEpisodes";
import { FullAnime } from "../../Types/FullAnime";
import EpisodeCard from "../EpisodeCard/EpisodeCard";

export default function MediaEpisodes({ animeFull }: { animeFull: FullAnime }) {
  const { loading, episodes } = useAnimeEpisodes(animeFull.mal_id);
  return (
    <div>
      <h1>Episodes</h1>

      <Row gutter={[16, 16]}>
        {episodes?.map((ep) => (
          <Col key={ep.mal_id} xs={24} sm={12} md={8}>
            <EpisodeCard ep={ep} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
