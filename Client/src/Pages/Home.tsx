import MediaSeason from "../Components/MediaSeason/MediaSeason";
import RecommendationCard from "./../Components/RecommendationCard/RecommendationCard";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexWrap: "wrap",
      }}
    >
      <section style={{ maxWidth: "700px", width: "100%" }}>
        <RecommendationCard />
        <MediaSeason />
      </section>
      <section style={{ maxWidth: "700px", width: "100%", height: "100%" }}>
        <div style={{ backgroundColor: "red", height: "450px" }}></div>
      </section>
    </div>
  );
}
