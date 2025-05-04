import { Avatar, Drawer, Menu, Typography } from "antd";
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
  const { Text } = Typography;

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
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Avatar
          size="large"
          src={user?.picture ? user.picture : "./defaultAvatar.jpg"}
        ></Avatar>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ margin: 0 }}>{user?.name}</p>
          <Text type="secondary" style={{ fontSize: "0.6rem" }}>
            {user?.email}
          </Text>
        </div>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
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
      </div>
    </Drawer>
  );
}
