export type TProduct= {
    name: string;
    brand: string;
    price: number;  
    category: string;
    description: string;
    quantity: number;  
    inStock: boolean;
    _id: string;
  }
export type TUpdateProduct= {
    price: number;  
    quantity: number;  
    _id: string;
  }
export type ProductModalProps= {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    modalTitle: string;
    productForm: TProduct;
    setProductForm: React.Dispatch<React.SetStateAction<TProduct>>;
    onSubmit: () => void;
  }
export type UpdateModalProps= {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    modalTitle: string;
    productUpdateForm: TUpdateProduct;
    setProductUpdateForm: React.Dispatch<React.SetStateAction<TUpdateProduct>>;
    onSubmit: () => void;
  }