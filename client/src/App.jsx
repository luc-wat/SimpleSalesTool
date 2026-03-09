import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Start from "./components/Start";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
}

export default App;