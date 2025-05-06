import { Tag, Image, Typography, theme, Button } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import {
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DislikeOutlined,
  LikeOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  TagOutlined,
} from "@ant-design/icons";
import IconText from "./IconText";
const { Text } = Typography;

export default function MediaSideInfo({ animeFull }: { animeFull: FullAnime }) {
  const { token } = theme.useToken();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        gap: "10px",
        backgroundColor: token.colorBgContainer,
        padding: "10px",
      }}
    >
      <div>
        
        <Image
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          src={animeFull?.images.jpg.large_image_url}
        ></Image>
<div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: token.colorBgContainerDisabled,
          }}
        >
          <Button type="text" icon={<ShareAltOutlined />} style={{ flex: 1 }} />
          <Button type="text" icon={<DislikeOutlined />} style={{ flex: 1 }} />
          <Button type="text" icon={<LikeOutlined />} style={{ flex: 1 }} />
          <Button type="text" icon={<BookOutlined />} style={{ flex: 1 }} />
        </div>
      </div>

      <div>
        <h1 style={{ margin: 0 }}>{animeFull?.title}</h1>
        <Text type="secondary">{animeFull?.title_japanese}</Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <IconText icon={<TagOutlined />} text="Genres" />
        <div>
          {[
            ...(animeFull?.genres.map((g) => {
              return { ...g, color: "default" };
            }) || []),
            ...(animeFull?.themes.map((t) => {
              return { ...t, color: "red" };
            }) || []),
            ...(animeFull?.demographics.map((t) => {
              return { ...t, color: "orange" };
            }) || []),
          ].map((item) => (
            <Tag color={item?.color}>{item.name}</Tag>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <IconText icon={<CalendarOutlined />} text="Aired" />
        <p style={{ margin: 0 }}>{animeFull.aired.string}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <IconText icon={<PlayCircleOutlined />} text="Episodes" />
        <p style={{ margin: 0 }}>{animeFull.episodes}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <IconText icon={<ClockCircleOutlined />} text="Length" />
        <p style={{ margin: 0 }}>{animeFull.duration}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <IconText icon={null} text="Studios" />

        <div>
          {animeFull.studios.map((studio) => (
            <Tag>{studio.name}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
