import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

//****************User Components*************

import PrivateRoute from "./pages/user/PrivateRoute.jsx";
import HomeScreen from "./pages/user/Home.jsx";
import SignIn from "./pages/user/SignIn.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import Profile from "./pages/user/Profile.jsx";

//************Admin Components*****************
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import EditUser from "./pages/admin/EditUser.jsx";
import AddUser from "./pages/admin/AddUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Private User Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />}></Route>
      <Route path="" element={<AdminProtectedRoute />}>
        <Route path="/admin/home" element={<AdminHome />}></Route>
        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/edit-user/:userId" element={<EditUser />}></Route>
        <Route path="/admin/add-user" element={<AddUser />}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
