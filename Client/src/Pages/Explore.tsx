import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useSeasonAnimes } from "../Hooks/useSeasonAnimes";
import { motion } from "framer-motion";
import "../styles/explore.css";
import MediaCard from "./../Components/Card/MediaCard";

export default function Explore() {
  const { seasonalAnimes, loading } = useSeasonAnimes();
  const data: ((typeof seasonalAnimes)[number] | undefined)[] = loading
    ? Array.from({ length: 3 })
    : seasonalAnimes;

  return (
    <div style={{ padding: "20px" }}>
      <Swiper
        style={{ maxWidth: "700px", padding: 10 }}
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
