import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Orders.css';
import SEOHead from '../SEO/SEOHead';

// Icons can be imported from your Assets folder
import phoneIcon from "../Assets/phone-icon.png";
import backIcon from "../Assets/back-icon.png";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const accessToken = localStorage.getItem("accessToken");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setOrders(response.data);

                // Calculate total quantity for each item
                const quantities = {};
                response.data.forEach(order => {
                    order.items.forEach(item => {
                        if (quantities[item.name]) {
                            quantities[item.name] += item.quantity;
                        } else {
                            quantities[item.name] = item.quantity;
                        }
                    });
                });
                setItemQuantities(quantities);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to load orders. Please try again.");
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, []);

    const handleCallAndalos = () => {
        window.location.href = 'tel:01151371200';
    };

    const handleCallRosto = () => {
        window.location.href = 'tel:01200001100'; 
    };

    const handleBack = () => {
        navigate('/order');
    };

    return (
        <div className="orders-page">
            <SEOHead 
                title="Order History & Summary - OrderFast | تاريخ الطلبات"
                description="View your order history and summary at OrderFast. Track all your food orders including طعمية, فول, صوابع, شيبسى, فول بيض, بطاطس بابا and more."
                keywords="order history, order summary, طلب طعام, food order tracking, order management, OrderFast orders, food delivery history"
                url="https://orderfast.com/orders"
            />
            <div className="page-header">
                <div className="logo-container">
                    <h1 className="logo">OrderFast</h1>
                </div>
            </div>
            
            <div className="orders-container">
                <div className="orders-header">
                    <h2>Orders Summary</h2>
                    <div className="header-underline"></div>
                </div>
                
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p>{error}</p>
                        <button className="retry-button" onClick={() => window.location.reload()}>
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="tables-container">
                            <div className="orders-section">
                                <h3 className="section-title">Individual Orders</h3>
                                <TableContainer component={Paper} className="table-container">
                                    <Table aria-label="orders table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="table-header">Customer Name</TableCell>
                                                <TableCell align="center" className="table-header">Items</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order._id}>
                                                    <TableCell component="th" scope="row" className="customer-cell">
                                                        {order.customer?.username || "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Table size="small" className="items-table">
                                                            <TableBody>
                                                                {order.items.map((item, index) => (
                                                                    <TableRow key={index} className="item-row">
                                                                        <TableCell className="item-name">{item.name}</TableCell>
                                                                        <TableCell align="right" className="item-quantity">{item.quantity}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            
                            <div className="orders-section summary-section">
                                <h3 className="section-title">Totals Summary</h3>
                                <TableContainer component={Paper} className="table-container summary-table">
                                    <Table aria-label="summary table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="table-header">Item Name</TableCell>
                                                <TableCell align="center" className="table-header">Total Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(itemQuantities).map(([itemName, quantity]) => (
                                                <TableRow key={itemName} className="summary-row">
                                                    <TableCell component="th" scope="row" className="item-name">{itemName}</TableCell>
                                                    <TableCell align="center" className="total-quantity">{quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                        
                        <div className="call-buttons-container">
                            <button className="call-button andalos" onClick={handleCallAndalos}>
                                <span className="phone-icon">📞</span>
                                Call الاندلس
                            </button>
                            <button className="call-button rosto" onClick={handleCallRosto}>
                                <span className="phone-icon">📞</span>
                                Call Rosto
                            </button>
                        </div>
                        
                        <button className="back-button" onClick={handleBack}>
                            <span className="back-icon">←</span>
                            Back to Order
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Orders;
