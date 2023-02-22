import Register from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" exact element={<Main />} />
          </Route>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
