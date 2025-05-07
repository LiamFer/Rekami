import {
  AppstoreAddOutlined,
  PlayCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Segmented, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import MediaOverview from "./MediaOverview";
import { useState } from "react";
import MediaEpisodes from "./MediaEpisodes";

export default function MediaOtherOptions({
  animeFull,
}: {
  animeFull: FullAnime;
}) {
  const { token } = theme.useToken();
  const [option, setOption] = useState(0);
  const options = [<MediaOverview animeFull={animeFull} />,<MediaEpisodes animeFull={animeFull}/>]
  return (
    <div>
      <Segmented
        onChange={setOption}
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
            value: 0,
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
            value: 1,
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
            value: 2,
          },
        ]}
        block
        style={{
          backgroundColor: token.colorBgContainerDisabled,
          padding: "5px",
        }}
      />
      {options[option]}
    </div>
  );
}
