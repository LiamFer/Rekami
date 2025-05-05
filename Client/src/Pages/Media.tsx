import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAnimeFull } from "../Hooks/useAnimeFull";
import { Image, Typography } from "antd";
const { Text } = Typography;

export default function Media() {
  const { id } = useParams();
  const { animeFull, loading } = useAnimeFull(id);
  if (loading) return <Loading />;

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
      <section style={{ display: "flex", flexDirection: "column" }}>
        <Image
          style={{
            maxWidth: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          src={animeFull?.images.jpg.large_image_url}
        ></Image>
        <h1 style={{ margin: 0 }}>{animeFull?.title}</h1>
        <Text type="secondary">{animeFull?.title_japanese}</Text>
      </section>

      <section>
        <div style={{ maxWidth: "600px" }}>
          <h1>Storyline</h1>
          <p>{animeFull?.synopsis}</p>
        </div>
      </section>
    </div>
  );
}
