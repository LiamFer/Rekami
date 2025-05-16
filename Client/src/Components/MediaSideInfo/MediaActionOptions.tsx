import {
  ShareAltOutlined,
  DislikeOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import { interestValue } from "../../Types/interestValue";

export default function MediaActionOptions({ anime }: { anime: FullAnime }) {
  const { token } = theme.useToken();


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: token.colorBgContainerDisabled,
      }}
    >
      <Button type="text" icon={<ShareAltOutlined />} style={{ flex: 1 }} />
      <Button
        variant="solid"
        type="text"
        color={anime?.interest == interestValue.notInterested ? "red" : undefined}
        icon={<DislikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button
        variant="solid"
        type="text"
        color={anime?.interest == interestValue.interested ? "blue" : undefined}
        icon={<LikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button type="text" icon={<BookOutlined />} style={{ flex: 1 }} />
    </div>
  );
}
