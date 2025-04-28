import { Drawer, Menu } from "antd";

export default function MobileMenu({ menuActive, setMenuActive,items }: any) {
  const onClose = () => setMenuActive(false)

  return (
    <Drawer onClose={onClose} open={menuActive}>
      <Menu
        style={{
          flexGrow: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          border: "none"
        }}
        mode="vertical"
        items={items}
      />
    </Drawer>
  );
}
