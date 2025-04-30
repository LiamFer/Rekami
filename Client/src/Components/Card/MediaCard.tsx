import { StarOutlined } from "@ant-design/icons";
import { Badge, Skeleton, Button } from "antd";
import { StandardAnime } from "../../Types/StandardAnime";
import "./mediaCard.css"; // vamos usar um CSS externo pra deixar mais limpo

export default function MediaCard({
  media,
  loading,
}: {
  media: StandardAnime | undefined;
  loading: boolean;
}) {
  return (
    <Badge.Ribbon
      text={
        <>
          <StarOutlined style={{ color: "yellow", marginRight: 5 }} />
          {media?.score ?? "Not Rated"}
        </>
      }
      color="orange"
    >
      <div className="media-card-wrapper">
        {loading || !media ? (
          <Skeleton.Image
            active
            className="antSkeletonImage"
            style={{ height: "300px", width: "100%" }}
          />
        ) : (
          <>
            <img
              src={media.images.jpg.large_image_url}
              alt={media.title}
              className="media-card-image"
            />
            <div className="media-card-content">
              <h3>{media.title}</h3>
              <div className="media-card-footer">
                <p>{media.status}</p>
                <Button type="primary" size="small">
                  Open
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Badge.Ribbon>
  );
}
