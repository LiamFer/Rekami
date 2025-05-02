import MediaSeason from "../Components/MediaSeason/MediaSeason";
import TopMediaList from "../Components/TopMediaList/TopMediaList";
import RecommendationCard from "./../Components/RecommendationCard/RecommendationCard";
import "../styles/home.css";
import MediaToday from "../Components/MediaToday/MediaToday";
import useUser from "../Hooks/useUser";
import LoginCard from "../Components/RecommendationCard/LoginCard";

export default function Home() {
  const user = useUser()

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
        {user.user ? <RecommendationCard /> : <LoginCard/>}
        <MediaSeason />
      </section>
      <section
        className="full-width-on-wrap"
        style={{
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <MediaToday></MediaToday>
        <TopMediaList></TopMediaList>
      </section>
    </div>
  );
}
