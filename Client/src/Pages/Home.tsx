import MediaSeason from "../Components/MediaSeason/MediaSeason";
import TopMediaList from "../Components/TopMediaList/TopMediaList";
import RecommendationCard from "./../Components/RecommendationCard/RecommendationCard";
import "../styles/home.css"

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
        flexWrap: "wrap",
        padding: "20px 0px",
        gap: "20px",
      }}
    >
      <section style={{ maxWidth: "1200px", width: "100%" }}>
        <RecommendationCard />
        <MediaSeason />
      </section>
      <section className="full-width-on-wrap" style={{ maxWidth: "500px", width: "100%", height: "100%" }}>
        <TopMediaList></TopMediaList>
        <TopMediaList></TopMediaList>
      </section>
    </div>
  );
}
