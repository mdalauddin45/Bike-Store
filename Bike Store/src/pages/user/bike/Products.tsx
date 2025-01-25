import  { useState } from "react";
import { useDeleteBikeMutation, useGetAllBikesQuery } from "../../../redux/api/bike/bikeApi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: bikes, isLoading, error } = useGetAllBikesQuery(searchTerm);
  const [deleteBike] = useDeleteBikeMutation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bike?")) {
      await deleteBike(id);
    }
  };
  const handleDetails = (id) => {
    navigate(`/products/${id}`); 
  };

  if (isLoading) return <p>Loading bikes...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Bikes</h1>
      <input
        type="text"
        placeholder="Search by name, brand, or category"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          display: "block",
        }}
      />
      {bikes?.data.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {bikes.data.map((bike) => (
            <div
              key={bike._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <h2>{bike.name}</h2>
              <p>
                <strong>Brand:</strong> {bike.brand}
              </p>
              <p>
                <strong>Model:</strong> {bike.model}
              </p>
              <p>
                <strong>Price:</strong> ${bike.price}
              </p>
              <p>
                <strong>Category:</strong> {bike.category}
              </p>
             
              <button
                onClick={() => handleDelete(bike._id)}
                style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Delete
              </button>
              <button
                onClick={() => handleDetails(bike._id)}
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  padding: "10px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No bikes found.</p>
      )}
    </div>
  );
};

export default Products;
