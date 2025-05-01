import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button, Rate, Spin, Tag, theme, Typography } from "antd";
import { useAnimeFull } from "../../Hooks/useAnimeFull";
import NotInterestedButton from "../Buttons/NotInterested/NotInterestedButton";
const { Paragraph, Text } = Typography;

export default function RecommendationCard() {
  const { animeFull, loading } = useAnimeFull(42310);
  const { token } = theme.useToken();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: token.colorBgContainer,
          border: "1px solid",
          borderColor: token.colorBorderSecondary,
          borderRadius: "10px",
          width: "100%",
          height: "350px",
          minHeight: "350px",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <Spin percent="auto" size="large" />
        <Text type="secondary">
          Wait a moment while we build your recommendations
        </Text>
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          backgroundColor: token.colorBgContainer,
          border: "1px solid",
          borderColor: token.colorBorderSecondary,
          overflow: "hidden",
          borderRadius: "10px",
          width: "100%",
          height: "350px",
          minHeight: "350px",
        }}
      >
        <div
          style={{
            flex: "1 1 0%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "250px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h1 style={{ fontSize: "2rem", margin: 0 }}>{animeFull?.title}</h1>
            <Rate
              disabled
              allowHalf
              defaultValue={(animeFull?.score || 0) / 2}
            />
            <Swiper
              style={{
                width: "100%",
              }}
              spaceBetween={8}
              slidesPerView="auto"
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {[
                ...(animeFull?.genres.map((g) => {
                  return { ...g, about: "genres" };
                }) || []),
                ...(animeFull?.themes.map((t) => {
                  return { ...t, about: "themes" };
                }) || []),
              ].map((item) => (
                <SwiperSlide key={item.name} style={{ width: "auto" }}>
                  <Tag color={item?.about == "genres" ? "default" : "red"}>
                    {item.name}
                  </Tag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Paragraph ellipsis={{ rows: 6 }}>{animeFull?.synopsis}</Paragraph>

          <div style={{ display: "flex", gap: "10px" }}>
            <NotInterestedButton></NotInterestedButton>{" "}
            <Button type="primary">Interested</Button>
          </div>
        </div>

        <img
          style={{
            height: "100%",
            width: "auto",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
          src={animeFull?.images.jpg.large_image_url}
          alt="anime"
        />
      </div>
    </div>
  );
}
