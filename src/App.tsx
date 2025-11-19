import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authProvider";
import Home from "./pages/Home";
import { ThreadProvider } from "./context/ThreadProvider";
import ThreadDetailPage from "./pages/ThreadDetailPage";

function App() {
  return (
    <>
      <AuthProvider>
        <ThreadProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/thread/:id" element={<ThreadDetailPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </ThreadProvider>
      </AuthProvider>
    </>
  );
}

export default App;
