import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/authProvider";
import Home from "./pages/Home";
import { ThreadProvider } from "./context/ThreadProvider";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import FollowsDetailPage from "./pages/FollowsDetailPage";
import ProfileDetailpage from "./pages/ProfileDetailpage";
import { ThemeProvider } from "./components/ThemeProvider";
import SearchDetailPage from "./pages/SearchDetailPage";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ThreadProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/thread/:id" element={<ThreadDetailPage />} />
                <Route path="/follows" element={<FollowsDetailPage />} />
                <Route path="/profile" element={<ProfileDetailpage />} />
                <Route path="/search" element={<SearchDetailPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </ThreadProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
