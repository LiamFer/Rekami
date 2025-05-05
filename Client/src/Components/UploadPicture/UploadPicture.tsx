import { App, Upload } from "antd";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import type { UploadFile, UploadProps } from "antd";
import { uploadProfilePicture } from "../../Services/server.service";
import { useDispatch } from "react-redux";
import { updateUserPicture } from "../../Redux/userSlice";

export default function UploadPicture() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch()
  const { message } = App.useApp();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
      message.error("It must be an Image!");
      return Upload.LIST_IGNORE;
    }

    if (!isLt2M) {
      message.error("The image size must be less than 2MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const customUpload = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await uploadProfilePicture(formData);
    if (response.success) {
      message.success("Image Uploaded!");
      const cloudinaryUrl = response.data.data
      dispatch(updateUserPicture(cloudinaryUrl))
      onSuccess(response.data);
    } else {
      message.error(response.error);
      onError(response.error);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "10px 0px" }}
    >
      <ImgCrop rotationSlider>
        <Upload
          customRequest={customUpload}
          listType="picture-circle"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
}
