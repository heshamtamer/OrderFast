import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Order.css";

const Order = () => {
    const [items, setItems] = useState([{ name: "", quantity: 1 }]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate


    const handleInputChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { name: "", quantity: 1 }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken"); // Retrieve the token from local storage

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/orders`,
                { items },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`, // Attach token here
                    },
                }
            );

            setMessage("Order created successfully!");
            setItems([{ name: "", quantity: 1 }]); // Reset the form
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "An error occurred");
        }
    };

    const handleViewOrders = () => {
        navigate("/Orders"); // Adjust this path to your actual route
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Create Your Order</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit} className="inputs">
                {items.map((item, index) => (
                    <div className="input" key={index}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(event) => handleInputChange(index, event)}
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(event) => handleInputChange(index, event)}
                            required
                        />
                        <button
                            className="submit"
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button className="action-button" type="button" onClick={handleAddItem}>
                    Add Another Item
                </button>
                <button type="submit" className="action-button">
                    Submit Order
                </button>
                <button type="button" className="action-button" onClick={handleViewOrders}>
                    View Orders
                </button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default Order;
