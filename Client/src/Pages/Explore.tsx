import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // 👈 importa o módulo
import { Card, Skeleton, Badge } from "antd";
import { useSeasonAnimes } from "../Hooks/useSeasonAnimes";
import "../styles/explore.css";
const { Meta } = Card;

export default function Explore() {
  const { seasonalAnimes, loading } = useSeasonAnimes();
  const data: ((typeof seasonalAnimes)[number] | undefined)[] = loading
    ? Array.from({ length: 3 })
    : seasonalAnimes;

  return (
    <div style={{ padding: "20px" }}>
      <Swiper
        style={{ maxWidth: "700px",padding:10 }}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
      >
        {data.map((a, i) => (
          <SwiperSlide key={a?.mal_id || i}>
            <Badge.Ribbon text={a?.score}>
              <Card
                style={{ width: "100%" }}
                hoverable
                loading={loading}
                styles={{ body: { padding: "10px" } }}
                cover={
                  loading || !a ? (
                    <Skeleton.Image
                      active
                      className="antSkeletonImage"
                      style={{ height: "200px" }}
                    />
                  ) : (
                    <img
                      src={a.images.jpg.large_image_url}
                      alt={a.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )
                }
              >
                {!loading && a && (
                  <Meta
                    title={a.title}
                    description={"a"}
                  />
                )}
              </Card>
            </Badge.Ribbon>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
