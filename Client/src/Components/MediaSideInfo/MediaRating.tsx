import { Rate, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";

export default function MediaRating({ animeFull }: { animeFull: FullAnime }) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          margin: 0,
          backgroundColor: "orange",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ margin: 0 }}>{animeFull.score}</h1>
      </div>
      <Rate
        disabled
        allowHalf
        count={10}
        value={animeFull.score}
        style={{ fontSize: "2.5rem", color: "orange" }}
      ></Rate>
    </div>
  );
}
