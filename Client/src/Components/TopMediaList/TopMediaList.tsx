import { StarFilled, TrophyOutlined } from "@ant-design/icons";
import { Avatar, List, Skeleton, Tag, theme } from "antd";
import { useTopAnimes } from "../../Hooks/useTopAnimes";

export default function TopMediaList() {
  const { token } = theme.useToken();
  const { topAnimes, loading } = useTopAnimes();
  const placeholderData = Array.from({ length: 5 }, (_, i) => ({
    loading: true,
    key: i,
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <TrophyOutlined
          style={{
            marginRight: 10,
            fontSize: "22px",
            padding: 10,
            backgroundColor: token.colorText,
            color: token.colorBgBase,
            borderRadius: "15px",
          }}
        />
        <h1>Top Animes</h1>
      </div>

      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
          height: "300px",
        }}
      >
        <List
          dataSource={loading ? placeholderData : topAnimes}
          renderItem={(media: any) => (
            <List.Item key={media.key || media.mal_id}>
              <Skeleton loading={loading} avatar active>
                {!loading && (
                  <>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size={"large"}
                          src={media.images.jpg.large_image_url}
                        />
                      }
                      title={
                        <a href={media.url} target="_blank" rel="noreferrer">
                          {media.rank}. {media.title}
                        </a>
                      }
                      description={
                        <>
                          <span>{media.title_japanese}</span>
                          <div>
                            {media.genres.map((g: any, idx: any) => (
                              <Tag key={idx}>{g.name}</Tag>
                            ))}
                          </div>
                        </>
                      }
                    />
                    <Tag icon={<StarFilled />} color="orange">
                      {media.score}
                    </Tag>
                  </>
                )}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
