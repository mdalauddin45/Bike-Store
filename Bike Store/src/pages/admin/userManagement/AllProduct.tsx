import { useState } from 'react';
import { toast } from 'sonner';
import { useGetAllBikesQuery, useDeleteBikeMutation } from '../../../redux/api/bike/bikeApi';
import { Button } from 'antd';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import { TProduct } from '../../../types/bike.type';

export const AllProduct = () => {
  const { data: products, isLoading, error } = useGetAllBikesQuery(undefined);
  const [deleteProduct] = useDeleteBikeMutation();

  const [productForm, setProductForm] = useState<TProduct>({
    name: '',
    brand: '',
    price: 0,
    category: '',
    description: '',
    quantity: 0,
    inStock: true,
    _id: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting product...');
    try {
      const response: any = await deleteProduct(id);
      if (response?.error) {
        toast.error('Failed to delete product', { id: toastId, duration: 2000 });
      } else {
        toast.success('Product deleted successfully', { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  const openModal = (product?: TProduct) => {
    if (product) {
      setModalTitle('Edit Product');
      setProductForm(product);
    } else {
      setModalTitle('Add New Product');
      setProductForm({
        name: '',
        brand: '',
        price: 0,
        category: '',
        description: '',
        quantity: 0,
        inStock: true,
        _id: '',
      });
    }
    setIsModalVisible(true);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products.</p>;

  return (
    <div>
      <h1>All Products</h1>

      <Button type="primary" onClick={() => openModal()} style={{ marginBottom: '20px' }}>
        Add New Product
      </Button>

      <ProductTable products={products?.data || []} onEdit={openModal} onDelete={handleDelete} />

      <ProductModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        modalTitle={modalTitle}
        productForm={productForm}
        setProductForm={setProductForm}
      />
    </div>
  );
};
