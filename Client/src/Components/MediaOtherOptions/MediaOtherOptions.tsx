import {
  AppstoreAddOutlined,
  PlayCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Segmented, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import MediaOverview from "./MediaOverview";

export default function MediaOtherOptions({
  animeFull,
}: {
  animeFull: FullAnime;
}) {
  const { token } = theme.useToken();
  return (
    <div>
      <Segmented
        options={[
          {
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AppstoreAddOutlined />
                Overview
              </div>
            ),
            value: "Overview",
          },
          {
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <PlayCircleOutlined />
                Episodes
              </div>
            ),
            value: "Episodes",
          },
          {
            label: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <LinkOutlined />
                Related
              </div>
            ),
            value: "Related",
          },
        ]}
        block
        style={{
          backgroundColor: token.colorBgContainerDisabled,
          padding: "5px",
        }}
      />
      <MediaOverview animeFull={animeFull}/>
    </div>
  );
}
