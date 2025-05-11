import { StandardAnime } from "../../Types/StandardAnime";
import { CalendarOutlined } from "@ant-design/icons";
import { Card, Tag, Image } from "antd";
import { useNavigate } from "react-router-dom";

export default function ScheduleCard({ media }: { media: StandardAnime }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/media/${media.mal_id}`);
  };

  return (
    <Card
      key={media.mal_id}
      styles={{
        body: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          height: "100px",
          gap: "16px",
        },
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          alignSelf: "start",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor:"pointer"
          }}
          onClick={handleClick}
        >
          {media.title}
        </h3>
        <Tag icon={<CalendarOutlined />} color="orange">
          {media.broadcast.string}
        </Tag>
        <p
          style={{
            margin: 0,
            fontSize: "0.8rem",
            lineHeight: "1.2",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {media.synopsis ? media.synopsis : "No Synopsis provided.."}
        </p>
      </div>

      <Image
        style={{
          height: "90px",
          aspectRatio: "2/3",
          borderRadius: "10px",
          objectFit: "cover",
          flexShrink: 0,
        }}
        src={media.images.jpg.large_image_url}
      />
    </Card>
  );
}
