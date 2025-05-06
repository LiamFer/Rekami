import { Empty } from "antd";
import React from "react";

export default function TrailerBox({
  trailerURL,
}: {
  trailerURL: string | undefined;
}) {
  if (!trailerURL) return null

  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Watch the Trailer</h1>
      <iframe
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "800px",
          aspectRatio: "16/9",
          border: "none",
        }}
        src={`${trailerURL}?autoplay=0`}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
