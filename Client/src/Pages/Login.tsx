export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
        gap: "20px",
        padding: "20px",
        minHeight: "100vh",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{flexGrow:1, backgroundColor: "red", height: "100%" }}>
        <h1>login</h1>
      </div>
      <img
        style={{
          width:"100%",
          height: "100%",
          borderRadius: 40,
          objectFit: "cover",
        }}
        src="https://wallpapercave.com/wp/wp6058611.jpg"
        alt=""
      />
    </div>
  );
}
