import { Avatar, Drawer, Menu } from "antd";
import { useAppConfigs } from "../../Context/App";
import useUser from "../../Hooks/useUser";
import LogoutButton from "./../Buttons/Logout/LogoutButton";
const items = [
  { key: "profile", label: "Profile" },
  { key: "interests", label: "Interests" },
  { key: "config", label: "Config." },
];

export default function UserMenu() {
  const { userMenuActive, setUserMenuActive } = useAppConfigs();
  const { user } = useUser();
  const onClose = () => setUserMenuActive(false);

  return (
    <Drawer
      width={250}
      onClose={onClose}
      open={userMenuActive}
      placement="right"
      closable={false}
      styles={{
        header: {
          display: "none",
        },
      }}
    >
      <Avatar
        size="large"
        src={user?.picture ? user.picture : "./defaultAvatar.jpg"}
      ></Avatar>
      <hr />
      <Menu
        style={{
          flexGrow: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          border: "none",
        }}
        mode="vertical"
        items={items}
      />
      <LogoutButton></LogoutButton>
    </Drawer>
  );
}
