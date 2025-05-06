import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAnimeFull } from "../Hooks/useAnimeFull";
import MediaSideInfo from "./../Components/MediaSideInfo/MediaSideInfo";
import MediaRating from "./../Components/MediaSideInfo/MediaRating";
import { Typography } from "antd";
import MediaStatistic from "../Components/MediaSideInfo/MediaStatistic";
import MediaCharacters from "../Components/MediaSideInfo/MediaCharacters";
import TrailerBox from "../Components/TrailerBox/TrailerBox";
const { Text } = Typography;

export default function Media() {
  const { id } = useParams();
  if (!id) return null;
  const { animeFull, loading } = useAnimeFull(id);
  if (loading || !animeFull) return <Loading />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        padding: "20px 0px",
        gap: "20px",
      }}
    >
      <MediaSideInfo animeFull={animeFull} />

      <section
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "300px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <MediaRating animeFull={animeFull} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "50px",
              }}
            >
              <MediaStatistic title={"Rank #"} value={animeFull.rank} />
              <MediaStatistic title={"Scored By"} value={animeFull.scored_by} />
              <MediaStatistic title={"Favorites"} value={animeFull.favorites} />
              <MediaStatistic title={"Members"} value={animeFull.members} />
            </div>

            <div style={{ maxWidth: "700px" }}>
              <h1>Storyline</h1>
              <Text type="secondary">{animeFull?.synopsis}</Text>
            </div>
          </div>

          <TrailerBox trailerURL={animeFull.trailer.embed_url} />
        </div>

        <div>
          <h1>Characters</h1>
          <MediaCharacters id={id} />
        </div>
      </section>
    </div>
  );
}
