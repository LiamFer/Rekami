import {
  ShareAltOutlined,
  DislikeOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";

export default function MediaActionOptions() {
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
        color="red"
        icon={<DislikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button
        variant="solid"
        type="text"
        color="blue"
        icon={<LikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button type="text" icon={<BookOutlined />} style={{ flex: 1 }} />
    </div>
  );
}
