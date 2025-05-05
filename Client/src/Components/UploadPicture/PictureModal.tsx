import { Modal } from "antd";
import UploadPicture from "./UploadPicture";
import { useNavigate } from "react-router-dom";

export default function PictureModal({ isModalOpen, setIsModalOpen }: any) {
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Modal
        title="Upload your Profile Picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"290px"}
        centered
        footer={null}
      >
        <UploadPicture />
      </Modal>
    </>
  );
}
