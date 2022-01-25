import React, { useState } from "react";
import { Modal } from "antd";

export default function BasicModal(props) {
  const { show, setShow, title, children, ...rest } = props;

  const [isModalVisible, setIsModalVisible] = useState(true);

  const showModal = () => {
    setShow(true);
  };

  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        className="basic-modal"
        title={title}
        visible={show}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        {...rest}
      >
        {children}
      </Modal>
    </>
  );
}
