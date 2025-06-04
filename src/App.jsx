import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Settings from "./pages/Settings";
import "./styles/app.css"
import { UserProvider } from './UserContext';
import ForgetPassword from "./pages/ForgetPassword";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import ContactUs from "./pages/Contactus";
import Download from "./pages/Download";
import Explore from "./pages/Explore";
import Likes from "./pages/Likes";  

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/likes" element={<UserProvider><Likes /></UserProvider>} />
        <Route path="/settings" element={<UserProvider><Settings /></UserProvider>} />
        <Route path="/profile" element={<UserProvider><Profile /></UserProvider>} />
        <Route path="/explore" element={<UserProvider><Explore /></UserProvider>} />
        <Route path="/chats" element={<UserProvider><Chats /></UserProvider>} />
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/useonphone" element={<Download />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset_password" element={<ForgetPassword />} />
        {/* <Route path="*" element={<NotFound />}></Route> */}
        <Route path="/manage/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>

  )
}
export default App