import Homepage from "./components/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "signin", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "wallet", element: <ProtectedRoute element={<Layout/>} /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
