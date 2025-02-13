import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { FavProvider } from "./contexts/FavContext";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  return (
    <FavProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Navigate to="/search" />} />
        </Routes>
      </Router>
    </FavProvider>
  );
}

export default App;
