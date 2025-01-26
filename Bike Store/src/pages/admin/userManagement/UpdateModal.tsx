import React from "react";
import { Modal, Form, InputNumber, Button } from "antd";
import { UpdateModalProps } from "../../../types/bike.type";

const UpdateModal: React.FC<UpdateModalProps> = ({
  isVisible,
  setIsVisible,
  modalTitle,
  productUpdateForm,
  setProductUpdateForm,
  onSubmit,
}) => {
  return (
    <Modal
      title={modalTitle}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsVisible(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Price">
          <InputNumber
            value={productUpdateForm.price}
            onChange={(value) =>
              setProductUpdateForm({ ...productUpdateForm, price: value || 0 })
            }
          />
        </Form.Item>

        <Form.Item label="Quantity">
          <InputNumber
            value={productUpdateForm.quantity}
            onChange={(value) =>
              setProductUpdateForm({
                ...productUpdateForm,
                quantity: value || 0,
              })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
