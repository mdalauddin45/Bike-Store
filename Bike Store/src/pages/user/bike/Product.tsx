import { useNavigate, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../../redux/api/bike/bikeApi";
import { Card, Typography, Row, Col, Button, Spin } from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: bike, isLoading, error } = useGetBikeByIdQuery(productId);

  const handleBuyNow = () => {
    if (!bike?.data.inStock) {
      toast.error("Sorry, this product is out of stock.");
      return;
    }

    try {
      navigate(`/order/${productId}`);
      toast.success("Redirecting to order page...");
    } catch (err) {
      toast.error("Failed to navigate to the order page.");
    }
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <p>Loading bike details...</p>
      </div>
    );

  if (error) {
    toast.error("Something went wrong while fetching the bike details!");
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger">Unable to load product details. Please try again later.</Text>
      </div>
    );
  }

  return (
    <Card
      style={{ maxWidth: "800px", margin: "50px auto", padding: "20px", borderRadius: "8px" }}
      bordered={true}
    >
      <Title level={2}>{bike?.data.name}</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Text strong>Brand:</Text> {bike?.data.brand}
        </Col>
        <Col span={12}>
          <Text strong>Category:</Text> {bike?.data.category}
        </Col>
        <Col span={12}>
          <Text strong>Price:</Text> ${bike?.data.price}
        </Col>
        <Col span={12}>
          <Text strong>Stock:</Text>{" "}
          <Text type={bike?.data.inStock ? "success" : "danger"}>
            {bike?.data.inStock ? "In Stock" : "Out of Stock"}
          </Text>
        </Col>
        <Col span={24}>
          <Text strong>Description:</Text> {bike?.data.description}
        </Col>
        <Col span={24}>
          <Text strong>Quantity:</Text> {bike?.data.quantity}
        </Col>
      </Row>
      <Button
        type="primary"
        size="large"
        onClick={handleBuyNow}
        style={{ marginTop: "20px" }}
        block
        disabled={!bike?.data.inStock}
      >
        Buy Now
      </Button>
    </Card>
  );
};

export default Product;
