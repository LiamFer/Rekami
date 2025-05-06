import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAnimeFull } from "../Hooks/useAnimeFull";
import MediaSideInfo from "./../Components/MediaSideInfo/MediaSideInfo";
import MediaRating from "./../Components/MediaSideInfo/MediaRating";
import { Typography } from "antd";
import MediaStatistic from "../Components/MediaSideInfo/MediaStatistic";
const { Text } = Typography;

export default function Media() {
  const { id } = useParams();
  const { animeFull, loading } = useAnimeFull(id);
  if (loading || !animeFull) return <Loading />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "20px 0px",
        gap: "20px",
      }}
    >
      <MediaSideInfo animeFull={animeFull}></MediaSideInfo>

      <section style={{ flexGrow: 1 }}>
        <MediaRating animeFull={animeFull} />
        <div
          style={{
            width: "100%",
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
        <div style={{ maxWidth: "600px" }}>
          <h1>Characters</h1>
          <p>{animeFull?.season}</p>
        </div>
      </section>
    </div>
  );
}
