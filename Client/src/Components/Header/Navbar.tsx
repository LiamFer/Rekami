import { Menu, theme, Avatar, AutoComplete, Input, Button } from "antd";
import MobileMenu from "./MobileMenu";
import "./header.css";
import { useAppConfigs } from "../../Context/App";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";

const items = [
  { key: "", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function Navbar() {
  const { token } = theme.useToken();
  const { isMobile, setUserMenuActive } = useAppConfigs();

  const navigate = useNavigate();
  const handleNavigation = (e: { key: string }) => {
    navigate(`/${e.key}`);
  };

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const [options, setOptions] = useState([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

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
        <AutoComplete
          className="searchBar"
          options={options}
          onSearch={(text) => setOptions(getPanelValue(text))}
        >
          <Input.Search placeholder="Search your Movie/Anime"></Input.Search>
        </AutoComplete>

        <Button className="searchBarMobile" icon={<SearchOutlined />}></Button>

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
            onClick={handleNavigation}
          />
        )}

        {/* <Button type="primary">Account</Button> */}

        <Avatar
          size="large"
          src="https://res.cloudinary.com/ddtu2lxue/image/upload/v1745441934/RekamiApp/Users/Pictures/pfpf3ccf500-914d-44c1-8a78-c17a06fbf581.jpg"
          onClick={() => setUserMenuActive(true)}
        ></Avatar>
      </nav>

      <MobileMenu items={items} handleNavigation={handleNavigation} />
      {true && <UserMenu />}
    </>
  );
}
