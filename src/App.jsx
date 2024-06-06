import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventDetail from "./pages/EventDetail.jsx"; // Import the new EventDetail page
import Login from "./pages/Login.jsx"; // Import the Login page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/event/:id" element={<EventDetail />} /> {/* Add route for EventDetail page */}
      <Route path="/login" element={<Login />} /> {/* Add route for Login page */}
      </Routes>
    </Router>
  );
}

export default App;
