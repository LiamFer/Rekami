import RegisterForm from "./../Components/RegisterForm/RegisterForm";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "20px",
        gap: "20px",
        flexWrap: "wrap-reverse",
      }}
    >
      <div
        style={{
          flex: "1 1 400px",
          maxWidth: "600px",
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img width={60} src="./lightModeLogo.svg" alt="" />
        <h1 style={{ fontWeight: "bold", margin: "0px" }}>WE RECOMMEND</h1>
        <RegisterForm />
      </div>

      <div
        style={{
          flex: "1 1 300px",
          minWidth: "300px",
        }}
      >
        <img
          src="https://wallpapercave.com/wp/wp6058611.jpg"
          alt="Wallpaper"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </div>
    </div>
  );
}
