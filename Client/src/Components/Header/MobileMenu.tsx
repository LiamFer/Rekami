import { Drawer, Menu } from "antd";
import { useAppConfigs } from "../../Context/App";

export default function MobileMenu({ items, handleNavigation }: any) {
  const { menuActive, setMenuActive } = useAppConfigs();
  const onClose = () => setMenuActive(false);

  return (
    <Drawer width={250} onClose={onClose} open={menuActive} placement="left">
      <Menu
        style={{
          flexGrow: 1,
          justifyContent: "flex-end",
          backgroundColor: "transparent",
          border: "none",
        }}
        mode="vertical"
        items={items}
        onClick={(e) => {
          handleNavigation(e);
          onClose();
        }}
      />
    </Drawer>
  );
}
