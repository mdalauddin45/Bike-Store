import React from 'react';
import { Modal, Form, Input, InputNumber, Switch, Button } from 'antd';
import { ProductModalProps } from '../../../types/bike.type';

const ProductModal: React.FC<ProductModalProps> = ({
  isVisible,
  setIsVisible,
  modalTitle,
  productForm,
  setProductForm,
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
        <Form.Item label="Name">
          <Input
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Brand">
          <Input
            value={productForm.brand}
            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber
            value={productForm.price}
            onChange={(value) => setProductForm({ ...productForm, price: value || 0 })}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Input
            value={productForm.category}
            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Quantity">
          <InputNumber
            value={productForm.quantity}
            onChange={(value) => setProductForm({ ...productForm, quantity: value || 0 })}
          />
        </Form.Item>
        <Form.Item label="In Stock">
          <Switch
            checked={productForm.inStock}
            onChange={(checked) => setProductForm({ ...productForm, inStock: checked })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
