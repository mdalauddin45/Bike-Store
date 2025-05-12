import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Input, Button, Select, InputNumber, message } from "antd";

const { Option } = Select;

const Checkout = ({ bike }: { bike: { name: string; price: number; stock: number } }) => {
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Update total price whenever quantity changes
  useEffect(() => {
    setTotalAmount(bike?.price * quantity);
  }, [quantity, bike?.price]);

  // Handle payment processing with SurjoPay
  const processPaymentWithSurjoPay = async (orderDetails: any) => {
    try {
      // Simulate a payment processing API call
      const response = await fetch("https://surjopay.payment.gateway/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const result = await response.json();

      if (result.success) {
        message.success("Payment successful! Your order has been placed.");
        form.resetFields();
      } else {
        message.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("An error occurred during payment processing.");
    }
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    if (quantity <= 0 || quantity > bike?.stock) {
      message.error("Invalid quantity. Please check the stock.");
      return;
    }

    const orderDetails = {
      productName: bike?.name,
      pricePerUnit: bike?.price,
      quantity,
      totalAmount,
      ...values,
    };

    if (values.paymentMethod === "SurjoPay") {
      await processPaymentWithSurjoPay(orderDetails);
    } else {
      message.success("Order placed successfully!");
      form.resetFields();
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Checkout</h1>
      <Row gutter={24}>
        {/* User Information Form */}
        <Col xs={24} md={12}>
          <Card title="User Information">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                name: "",
                email: "",
                address: "",
                paymentMethod: "SurjoPay",
                quantity: 1,
              }}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name." }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email." },
                  { type: "email", message: "Please enter a valid email address." },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Shipping Address"
                rules={[{ required: true, message: "Please enter your address." }]}
              >
                <Input.TextArea rows={3} placeholder="Enter your shipping address" />
              </Form.Item>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: "Please select a payment method." }]}
              >
                <Select placeholder="Select payment method">
                  <Option value="SurjoPay">SurjoPay</Option>
                  <Option value="Cash on Delivery">Cash on Delivery</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Quantity">
                <InputNumber
                  min={1}
                  max={bike?.stock}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Confirm Order
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col xs={24} md={12}>
          <Card title="Order Summary">
            <p>
              <strong>Product:</strong> {bike?.name}
            </p>
            <p>
              <strong>Price per Unit:</strong> ${bike?.price}
            </p>
            <p>
              <strong>Available Stock:</strong> {bike?.stock}
            </p>
            <h3 style={{ marginTop: "16px" }}>
              <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
            </h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
