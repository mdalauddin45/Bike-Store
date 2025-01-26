import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllBikesQuery,
  useDeleteBikeMutation,
  useAddBikeMutation,
  useUpdateBikeMutation,
} from "../../../redux/api/bike/bikeApi";
import { Button } from "antd";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import { TProduct, TUpdateProduct } from "../../../types/bike.type";
import UpdateModal from "./UpdateModal";

export const AllProduct = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetAllBikesQuery(undefined);
  const [deleteProduct] = useDeleteBikeMutation();
  const [addBike] = useAddBikeMutation();
  const [updateBike] = useUpdateBikeMutation();

  const [productForm, setProductForm] = useState<TProduct>({
    name: "",
    brand: "",
    price: 0,
    category: "",
    description: "",
    quantity: 0,
    inStock: true,
    _id: "",
  });
  const [productUpdateForm, setProductUpdateForm] = useState<TUpdateProduct>({
    price: 0,
    quantity: 0,
    _id: "",
  });

  // Separate states for each modal
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const openAddModal = () => {
    setProductForm({
      name: "",
      brand: "",
      price: 0,
      category: "",
      description: "",
      quantity: 0,
      inStock: true,
      _id: "",
    });
    setIsAddModalVisible(true);
  };

  const openEditModal = (product: TUpdateProduct) => {
    setProductUpdateForm({
      price: product.price,
      quantity: product.quantity,
      _id: product._id,
    });
    setIsUpdateModalVisible(true);
  };

  const handleAddProduct = async () => {
    const toastId = toast.loading("Processing...");
    try {
      const response: any = await addBike(productForm); // Add product
      if (response?.error) {
        toast.error("Failed to add product", { id: toastId, duration: 2000 });
      } else {
        toast.success("Product added successfully", {
          id: toastId,
          duration: 2000,
        });
        setIsAddModalVisible(false); // Close modal after successful addition
        refetch(); // Refresh product list
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const handleUpdateProduct = async () => {
    const toastId = toast.loading("Processing...");
    console.log(productUpdateForm)
    try {
      const response: any = await updateBike({id: productUpdateForm._id,
         productUpdateForm});
      console.log(productUpdateForm._id, response.data); 
      if (response?.error) {
        toast.error("Failed to update product", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Product updated successfully", {
          id: toastId,
          duration: 2000,
        });
        setIsUpdateModalVisible(false); // Close modal after successful update
        refetch(); // Refresh product list
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting product...");
    try {
      const response: any = await deleteProduct(id);
      if (response?.error) {
        toast.error("Failed to delete product", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Product deleted successfully", {
          id: toastId,
          duration: 2000,
        });
        refetch(); // Refresh product list
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products.</p>;

  return (
    <div>
      <h1>All Products</h1>

      <Button
        type="primary"
        onClick={() => openAddModal()}
        style={{ marginBottom: "20px" }}
      >
        Add New Product
      </Button>

      <ProductTable
        products={products?.data || []}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <ProductModal
        isVisible={isAddModalVisible}
        setIsVisible={setIsAddModalVisible}
        modalTitle="Add New Product"
        productForm={productForm}
        setProductForm={setProductForm}
        onSubmit={handleAddProduct}
      />

      <UpdateModal
        isVisible={isUpdateModalVisible}
        setIsVisible={setIsUpdateModalVisible}
        modalTitle="Edit Product"
        productUpdateForm={productUpdateForm}
        setProductUpdateForm={setProductUpdateForm}
        onSubmit={handleUpdateProduct}
      />
    </div>
  );
};
