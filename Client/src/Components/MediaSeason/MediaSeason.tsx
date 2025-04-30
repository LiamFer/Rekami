import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSeasonAnimes } from "../../Hooks/useSeasonAnimes";
import { motion } from "framer-motion";
import "./mediaSeason.css";
import MediaCard from "../Card/MediaCard";
import { CalendarOutlined } from "@ant-design/icons";
import { theme } from "antd";

export default function MediaSeason() {
  const { seasonalAnimes, loading } = useSeasonAnimes();
  const { token } = theme.useToken();
  const data: ((typeof seasonalAnimes)[number] | undefined)[] = loading
    ? Array.from({ length: 3 })
    : seasonalAnimes;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        // maxWidth: "700px",
        // width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <CalendarOutlined
          style={{
            marginRight: 10,
            fontSize: "22px",
            padding: 10,
            backgroundColor: token.colorText,
            color: token.colorBgBase,
            borderRadius: "15px",
          }}
        />
        <h1>This Season</h1>
      </div>
      <Swiper
        style={{
          width: "100%",
          padding: 8,
          margin: 0,
        }}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <MediaCard media={a} loading={loading}></MediaCard>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
