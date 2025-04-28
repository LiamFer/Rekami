import { Avatar, Drawer, Menu } from "antd";
import { useAppConfigs } from "../../Context/App";

export default function UserMenu({ items }: any) {
  const { userMenuActive, setUserMenuActive } = useAppConfigs();
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
        src="https://res.cloudinary.com/ddtu2lxue/image/upload/v1745441934/RekamiApp/Users/Pictures/pfpf3ccf500-914d-44c1-8a78-c17a06fbf581.jpg"
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
