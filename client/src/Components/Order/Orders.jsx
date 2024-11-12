import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
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

            } catch (error) {
                console.error("Error fetching orders:", error);
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

    return (
        <div className="container">
            <div className="header">
                <div className="text">Orders</div>
                <div className="underline"></div>
            </div>
            <TableContainer component={Paper} className="table-container">
                <Table sx={{ minWidth: 650 }} aria-label="orders table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-head-cell">Customer Name</TableCell>
                            <TableCell align="center" className="table-head-cell">Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" className="table-cell">
                                    {order.customer?.username || "N/A"}
                                </TableCell>
                                <TableCell>
                                    <Table size="small" className="item-table">
                                        <TableBody>
                                            {order.items.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="item-table-cell">{item.name}</TableCell>
                                                    <TableCell align="right" className="item-table-cell">{item.quantity}</TableCell>
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

            {/* Summary Table for Item Totals */}
            <TableContainer component={Paper} className="table-container summary-table">
                <Table sx={{ minWidth: 400 }} aria-label="summary table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-head-cell">Item Name</TableCell>
                            <TableCell align="center" className="table-head-cell">Total Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(itemQuantities).map(([itemName, quantity]) => (
                            <TableRow key={itemName}>
                                <TableCell component="th" scope="row" className="table-cell">{itemName}</TableCell>
                                <TableCell align="center" className="table-cell">{quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Call Buttons */}
            <div className="button-container">
                <button className="call-button" onClick={handleCallAndalos}>Call الاندلس</button>
                <button className="call-button" onClick={handleCallRosto}>Call Rosto</button>
            </div>
        </div>
    );
};

export default Orders;
