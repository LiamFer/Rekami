import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAnimeFull } from "../Hooks/useAnimeFull";
import { Image, Tag, Typography } from "antd";
import MediaSideInfo from './../Components/MediaSideInfo/MediaSideInfo';
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
        <div style={{ maxWidth: "600px" }}>
          <h1>Storyline</h1>
          <p>{animeFull?.synopsis}</p>
        </div>
        <div style={{ maxWidth: "600px" }}>
          <h1>The Cast</h1>
          <p>{animeFull?.season}</p>
        </div>
      </section>
    </div>
  );
}
