import { Form, InputNumber, Button } from 'antd';
import { TProduct } from '../../../types/bike.type';

interface ProductFormProps {
  productForm: TProduct;
  setProductForm: React.Dispatch<React.SetStateAction<TProduct>>;
  setIsVisible: (visible: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productForm, setProductForm, setIsVisible }) => {
  const handleUpdate = () => {
    // Handle update logic here (you can pass the logic via props)
    setIsVisible(false);
  };

  return (
    <Form onFinish={handleUpdate} layout="vertical">
      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
        <InputNumber
          value={productForm.price}
          onChange={(value) => setProductForm({ ...productForm, price: value })}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input the quantity!' }]}
      >
        <InputNumber
          value={productForm.quantity}
          onChange={(value) => setProductForm({ ...productForm, quantity: value })}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Update Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
