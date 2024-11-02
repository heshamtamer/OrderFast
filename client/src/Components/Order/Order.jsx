import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Order.css";

const commonItems = ["طعمية", "فول", "صوابع", "شيبسى", "فول بيض", "بطاطس بابا"]; // Add common items here

const Order = () => {
    const [items, setItems] = useState([{ name: "", quantity: 1, custom: false }]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (index, event) => {
        const values = [...items];
        const { name, value } = event.target;

        if (name === "name") {
            values[index].name = value;
            values[index].custom = value === "custom";
        } else {
            values[index][name] = value;
        }
        
        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { name: "", quantity: 1, custom: false }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken");

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/orders`,
                { items },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setMessage("Order created successfully!");
            setItems([{ name: "", quantity: 1, custom: false }]); // Reset the form
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "An error occurred");
        }
    };

    const handleViewOrders = () => {
        navigate("/Orders");
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
                        <select
                            name="name"
                            value={item.custom ? "custom" : item.name}
                            onChange={(event) => handleInputChange(index, event)}
                            required
                        >
                            <option value="">Select Item</option>
                            {commonItems.map((commonItem, i) => (
                                <option key={i} value={commonItem}>{commonItem}</option>
                            ))}
                            <option value="custom">Other (Specify)</option>
                        </select>
                        {item.custom && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter custom item"
                                value={item.name}
                                onChange={(event) => handleInputChange(index, event)}
                                required
                            />
                        )}
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
