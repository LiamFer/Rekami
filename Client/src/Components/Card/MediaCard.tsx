import { StarOutlined } from "@ant-design/icons";
import { Badge, Skeleton, Button, Card } from "antd";
import { SeasonAnime } from "../../Types/SeasonAnime";
import { motion } from "framer-motion";
const { Meta } = Card;

export default function MediaCard({
  media,
  loading,
}: {
  media: SeasonAnime | undefined;
  loading: boolean;
}) {
  return (

      <Badge.Ribbon
        text={
          <>
            <StarOutlined style={{ color: "yellow", marginRight: 5 }} />
            {media?.score ? media?.score : "Not Rated"}
          </>
        }
        color="orange"
      >
        <Card
          style={{ width: "100%" }}
          hoverable
          loading={loading}
          styles={{ body: { padding: "10px" } }}
          cover={
            loading || !media ? (
              <Skeleton.Image
                active
                className="antSkeletonImage"
                style={{ height: "200px" }}
              />
            ) : (
              <img
                src={media.images.jpg.large_image_url}
                alt={media.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            )
          }
        >
          {!loading && media && (
            <Meta
              title={media.title}
              description={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p>{media.status}</p>
                  <Button type="primary" size="small">
                    Open
                  </Button>
                </div>
              }
            />
          )}
        </Card>
      </Badge.Ribbon>
  );
}
