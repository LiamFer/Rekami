import { Menu, theme, Avatar, AutoComplete, Input, Button } from "antd";
import MobileMenu from "./MobileMenu";
import "./header.css";
import { useAppConfigs } from "../../Context/App";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";

const items = [
  { key: "", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function Navbar() {
  const { isMobile, setUserMenuActive } = useAppConfigs();
  const { token } = theme.useToken();
  const {user} = useUser();
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

        {user ? (
          <Avatar
            size="large"
            src={user?.picture ? user.picture : "./defaultAvatar.jpg"}
            onClick={() => setUserMenuActive(true)}
          />
        ) : (
          <Button onClick={()=> navigate("/login")} type="primary">Account</Button>
        )}
      </nav>

      <MobileMenu items={items} handleNavigation={handleNavigation} />
      {true && <UserMenu />}
    </>
  );
}
