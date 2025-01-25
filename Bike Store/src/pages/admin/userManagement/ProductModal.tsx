import { Modal } from 'antd';
import ProductForm from './ProductForm';
import { TProduct } from '../../../types/bike.type';

interface ProductModalProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  modalTitle: string;
  productForm: TProduct;
  setProductForm: React.Dispatch<React.SetStateAction<TProduct>>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isVisible,
  setIsVisible,
  modalTitle,
  productForm,
  setProductForm,
}) => {
  return (
    <Modal
      title={modalTitle}
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={null}
      width={500}
    >
      <ProductForm productForm={productForm} setProductForm={setProductForm} setIsVisible={setIsVisible} />
    </Modal>
  );
};

export default ProductModal;
