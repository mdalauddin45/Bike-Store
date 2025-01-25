import { Table, Button, Space } from 'antd';
import { TProduct } from '../../../types/bike.type';

interface ProductTableProps {
  products: TProduct[];
  onEdit: (product: TProduct) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (product: TProduct) => (
        <Space size="middle">
          <Button onClick={() => onEdit(product)}>Edit</Button>
          <Button danger onClick={() => onDelete(product._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="_id" pagination={{ pageSize: 10 }} />;
};

export default ProductTable;
