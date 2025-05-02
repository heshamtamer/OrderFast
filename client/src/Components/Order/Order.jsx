import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Order.css";

// Icons can be imported from your Assets folder
import addIcon from "../Assets/add-icon.png";
import removeIcon from "../Assets/remove-icon.png";
import viewIcon from "../Assets/view-icon.png";

const commonItems = ["طعمية", "فول", "صوابع", "شيبسى", "فول بيض", "بطاطس بابا"];

const Order = () => {
    const [items, setItems] = useState([{ name: "", quantity: 1, custom: false, customName: "" }]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (index, event) => {
        const values = [...items];
        const { name, value } = event.target;

        if (name === "name") {
            values[index].custom = value === "custom";
            values[index].name = value === "custom" ? "" : value;
        } else if (name === "customName") {
            values[index].customName = value;
        } else {
            values[index][name] = value;
        }

        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { name: "", quantity: 1, custom: false, customName: "" }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const accessToken = localStorage.getItem("accessToken");

        // Prepare items, setting custom items' name to customName value
        const preparedItems = items.map(item => ({
            name: item.custom ? item.customName : item.name,
            quantity: item.quantity,
        }));

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/orders`,
                { items: preparedItems },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setMessage("الف هنا يا كبييير");
            setItems([{ name: "", quantity: 1, custom: false, customName: "" }]); // Reset the form
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "An error occurred");
        }
    };

    const handleViewOrders = () => {
        navigate("/Orders");
    };

    return (
        <div className="order-page">
            <div className="page-header">
                <div className="logo-container">
                    <h1 className="logo">OrderFast</h1>
                </div>
            </div>
            
            <div className="order-container">
                <div className="order-header">
                    <h2>Create Your Order</h2>
                    <div className="header-underline"></div>
                </div>
                
                <form onSubmit={handleSubmit} className="order-form">
                    {items.map((item, index) => (
                        <div className="order-item" key={index}>
                            <div className="item-row">
                                <div className="item-select-container">
                                    <label>Item</label>
                                    <select
                                        name="name"
                                        value={item.custom ? "custom" : item.name}
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                        className="item-select"
                                    >
                                        <option value="">Select Item</option>
                                        {commonItems.map((commonItem, i) => (
                                            <option key={i} value={commonItem}>{commonItem}</option>
                                        ))}
                                        <option value="custom">Other (Specify)</option>
                                    </select>
                                </div>
                                
                                <div className="item-quantity-container">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Qty"
                                        value={item.quantity}
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                        className="quantity-input"
                                        min="1"
                                    />
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem(index)}
                                    className="remove-item-btn"
                                    aria-label="Remove item"
                                >
                                    ×
                                </button>
                            </div>
                            
                            {item.custom && (
                                <div className="custom-item-row">
                                    <label>Custom Item Name</label>
                                    <input
                                        type="text"
                                        name="customName"
                                        placeholder="Enter custom item name"
                                        value={item.customName}
                                        onChange={(event) => handleInputChange(index, event)}
                                        required
                                        className="custom-item-input"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <div className="order-actions">
                        <button 
                            type="button" 
                            className="action-btn add-item-btn" 
                            onClick={handleAddItem}
                        >
                            <span className="btn-icon">+</span>
                            Add Another Item
                        </button>
                        
                        <button 
                            type="submit" 
                            className="action-btn submit-order-btn"
                        >
                            Submit Order
                        </button>
                        
                        <button 
                            type="button" 
                            className="action-btn view-orders-btn" 
                            onClick={handleViewOrders}
                        >
                            View All Orders
                        </button>
                    </div>
                </form>
                
                {message && (
                    <div className="message-container">
                        <p className="message">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
