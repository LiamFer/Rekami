import { Menu, theme, Avatar, AutoComplete, Input, Button } from "antd";
import MobileMenu from "./MobileMenu";
import "./header.css";
import { useAppConfigs } from "../../Context/App";

const items = [
  { key: "home", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function Navbar() {
  const { token } = theme.useToken();
  const { isMobile } = useAppConfigs();

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <AutoComplete className="searchBar">
          <Input.Search placeholder="Search your Movie/Anime"></Input.Search>
        </AutoComplete>
        {!isMobile && (
          <Menu
            style={{
              flexGrow: 1,
              justifyContent: "flex-end",
              backgroundColor: "transparent",
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
            mode="horizontal"
            items={items}
          />
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          <Button type="primary">Register</Button>
          <Button type="default">Sign In</Button>
        </div>
        

        <Avatar
          size="large"
          src="https://res.cloudinary.com/ddtu2lxue/image/upload/v1745441934/RekamiApp/Users/Pictures/pfpf3ccf500-914d-44c1-8a78-c17a06fbf581.jpg"
        ></Avatar>
      </nav>

      <MobileMenu
        items={items}
      />
    </>
  );
}
