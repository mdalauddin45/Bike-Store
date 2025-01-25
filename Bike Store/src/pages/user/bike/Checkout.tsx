import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBikeByIdQuery } from "../../../redux/api/bike/bikeApi";
import { toast } from "sonner";
import { Typography, Input, Button, Card, Form, Spin, Space } from "antd";

const { Title, Paragraph, Text } = Typography;

const Checkout = () => {
  const { productId } = useParams();
  const { data: bike, isLoading, error } = useGetBikeByIdQuery(productId!);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);
    if (bike) setTotalPrice(newQuantity * bike.data.price);
  };

  const handleSubmit = async () => {
    if (!email || !shippingAddress) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (bike && bike.data.inStock && quantity <= bike.data.inStock) {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            product: productId,
            quantity,
            totalPrice,
            shippingAddress,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Order placed successfully!");
          navigate("/order-success");
        } else {
          toast.error(data.error || "Something went wrong!");
        }
      } catch (error) {
        toast.error("Error placing the order. Please try again.");
      }
    } else {
      toast.error("Not enough stock available.");
    }
  };

  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <Text>Loading checkout details...</Text>
      </div>
    );

  if (error) {
    toast.error("Failed to fetch product details.");
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Text type="danger">Something went wrong. Please try again later.</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <Title level={2}>Checkout</Title>
      <Card bordered>
        <Title level={3}>{bike?.data.name}</Title>
        <Paragraph>
          <Text strong>Brand:</Text> {bike?.data.brand}
        </Paragraph>
        <Paragraph>
          <Text strong>Price:</Text> ${bike?.data.price}
        </Paragraph>
        <Paragraph>
          <Text strong>Description:</Text> {bike?.data.description}
        </Paragraph>
        <Paragraph>
          <Text strong>Stock:</Text> {bike?.data.inStock ? "In stock" : "Out of stock"}
        </Paragraph>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <Title level={4}>Enter Shipping Information</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Your Email"
            required
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item label="Quantity">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              min={1}
              max={bike?.data.inStock || 1}
              placeholder="Enter quantity"
            />
          </Form.Item>

          <Form.Item
            label="Shipping Address"
            required
            rules={[{ required: true, message: "Please enter your shipping address" }]}
          >
            <Input
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </Form.Item>

          <Space direction="vertical" size="middle" style={{ marginTop: "10px" }}>
            <Paragraph>
              <Text strong>Total Price:</Text> ${totalPrice}
            </Paragraph>
          </Space>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
            }}
          >
            Complete Purchase
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
