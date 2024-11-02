import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Orders.css'; // Import the CSS file

const Orders = () => {
    const [orders, setOrders] = useState([]);

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
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        
        fetchOrders();
    }, []);

    return (
        <div className="container">
            <div className="header">
                <div className="text">Orders</div>
                <div className="underline"></div>
            </div>
            <TableContainer component={Paper} className="table-container">
                <Table sx={{ minWidth: 600 }} aria-label="orders table">
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
        </div>
    );
}

export default Orders;
