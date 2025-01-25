import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetBikeByIdQuery } from '../../../redux/api/bike/bikeApi';

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data: bike, isLoading, error } = useGetBikeByIdQuery(productId);  
    const handleBuyNow = () => {
        navigate(`/order/${productId}`);
      };
  
    if (isLoading) return <p>Loading bike details...</p>;
    if (error) return <p>Something went wrong while fetching the bike details!</p>;
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>{bike?.name}</h1>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <p>
            <strong>Brand:</strong> {bike?.data.brand}
          </p>
          <p>
            <strong>Category:</strong> {bike?.data.category}
          </p>
          <p>
            <strong>Price:</strong> ${bike?.data.price}
          </p>
          <p>
            <strong>Stock:</strong> {bike?.data.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <p>
          <strong>Description:</strong> {bike?.data.description}
        </p>
        <p>
          <strong>Quantity:</strong> {bike?.data.quantity}
        </p>
        <button
            onClick={handleBuyNow}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Buy Now
          </button>
      </div>
    );
  };
  

export default Product;