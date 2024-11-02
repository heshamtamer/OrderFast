import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import OrderForm from "./Components/Order/Order"; // Import the new OrderForm component
import Orders from "./Components/Order/Orders"; // Import the Orders component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/order" element={<OrderForm />} /> {/* Route for order form */}
        <Route path="/orders" element={<Orders />} /> {/* New route for Orders table */}
      </Routes>
    </Router>
  );
}

export default App;
