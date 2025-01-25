import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBikeByIdQuery } from '../../../redux/api/bike/bikeApi';
import { toast } from 'sonner';

const Checkout = () => {
  const { productId } = useParams();
  const { data: bike, isLoading, error } = useGetBikeByIdQuery(productId!);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value));
    setQuantity(newQuantity);
    if (bike) setTotalPrice(newQuantity * bike.data.price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          navigate("/order-success"); // Redirect to a success page
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

  if (isLoading) return <p>Loading checkout details...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Checkout</h1>
      <div>
        <h2>{bike?.data.name}</h2>
        <p><strong>Brand:</strong> {bike?.data.brand}</p>
        <p><strong>Price:</strong> ${bike?.data.price}</p>
        <p><strong>Description:</strong> {bike?.data.description}</p>
        <p><strong>Stock:</strong> {bike?.data.inStock ? 'In stock' : 'Out of stock'}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Enter Shipping Information</h3>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label>Your Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '10px', width: '100%' }}
            />
          </div>

          {/* Quantity Input */}
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={bike?.data.inStock || 1}
              required
              style={{ padding: '10px', width: '100%' }}
            />
          </div>

          {/* Shipping Address Input */}
          <div>
            <label>Shipping Address:</label>
            <input
              type="text"
              name="address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              style={{ padding: '10px', width: '100%' }}
            />
          </div>

          {/* Total Price */}
          <div style={{ marginTop: '10px' }}>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
