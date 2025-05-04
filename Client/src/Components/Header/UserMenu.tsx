import { Avatar, Drawer, Menu } from "antd";
import { useAppConfigs } from "../../Context/App";
import useUser from "../../Hooks/useUser";

export default function UserMenu({ items }: any) {
  const { userMenuActive, setUserMenuActive } = useAppConfigs();
  const {user} = useUser()
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
    </Drawer>
  );
}
