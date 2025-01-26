import { useState } from "react";
import { useGetAllBikesQuery } from "../../../redux/api/bike/bikeApi";
import { useNavigate } from "react-router-dom";
import { Card, Input, Row, Col, Button, Spin, Typography } from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;
const { Search } = Input;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: bikes, isLoading, error } = useGetAllBikesQuery(searchTerm);
  const navigate = useNavigate();
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleDetails = (id: string) => {
    try {
      navigate(`/products/${id}`);
      toast.success("Navigating to product details...");
    } catch {
      toast.error("Failed to navigate to product details.");
    }
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <p>Loading bikes...</p>
      </div>
    );

  if (error) {
    toast.error("Something went wrong while fetching bikes!");
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger">Failed to load bikes. Please try again later.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>All Bikes</Title>
      <Search
        placeholder="Search by name, brand, or category"
        onSearch={handleSearch}
        allowClear
        enterButton
        style={{ marginBottom: "20px", maxWidth: "400px" }}
      />
      {bikes?.data.length > 0 ? (
        <Row gutter={[16, 16]}>
          {bikes.data.map((bike:any) => (
            <Col key={bike._id} xs={24} sm={12} lg={8}>
              <Card
                title={bike.name}
                bordered
                hoverable
              >
                <p>
                  <Text strong>Brand:</Text> {bike.brand}
                </p>
                <p>
                  <Text strong>Price:</Text> ${bike.price}
                </p>
                <p>
                  <Text strong>Category:</Text> {bike.category}
                </p>
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                  <Button type="primary" onClick={() => handleDetails(bike._id)}>
                    View Details
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No bikes found.</p>
      )}
    </div>
  );
};

export default Products;
