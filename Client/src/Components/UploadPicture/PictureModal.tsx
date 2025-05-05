import { Button, Modal } from "antd";
import { useState } from "react";
import UploadPicture from "./UploadPicture";

export default function PictureModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      >
        <UploadPicture />
      </Modal>
    </>
  );
}
