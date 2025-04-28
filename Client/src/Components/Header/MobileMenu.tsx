import { Drawer, Menu } from "antd";
import { useAppConfigs } from "../../Context/App";

export default function MobileMenu({ items }: any) {
  const { menuActive, setMenuActive } = useAppConfigs();
  const onClose = () => setMenuActive(false);

  return (
    <Drawer onClose={onClose} open={menuActive} placement="left">
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
