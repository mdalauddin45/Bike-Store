import { Link, useParams } from 'react-router-dom';
import { useGetBikeByIdQuery } from '../../../redux/api/bike/bikeApi';

const Product = () => {
    const { productId } = useParams();
    console.log(productId);
    const { data: bike, isLoading, error } = useGetBikeByIdQuery(productId);  
  
    if (isLoading) return <p>Loading bike details...</p>;
    if (error) return <p>Something went wrong while fetching the bike details!</p>;
  
    return (
      <div style={{ padding: "20px" }}>
        <h1>{bike?.name}</h1>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <p>
            <strong>Brand:</strong> {bike?.brand}
          </p>
          <p>
            <strong>Category:</strong> {bike?.category}
          </p>
          <p>
            <strong>Price:</strong> ${bike?.price}
          </p>
          <p>
            <strong>Stock:</strong> {bike?.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <p>
          <strong>Description:</strong> {bike?.description}
        </p>
        <p>
          <strong>Quantity:</strong> {bike?.quantity}
        </p>
  
        <Link to="/user/products" style={{ marginTop: "20px", display: "inline-block", padding: "10px", backgroundColor: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "4px" }}>
          Back to Products
        </Link>
      </div>
    );
  };
  

export default Product;