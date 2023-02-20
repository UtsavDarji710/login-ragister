import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUP/SignUp";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./Redux/Action/Action";
import Product from "./Components/Products/Product";
import Profile from "./Components/Profile/Profile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import ProductItem from "./Components/Products/ProductItem";
import { ToastContainer } from "react-toastify";
import ProtectedRouter from "./ProtectedRouter/ProtectedRouter";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const userToken = useSelector((state) => state.auth);

  console.log("is logged auth: ", userToken);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user/product"
            element={
              <ProtectedRouter isAuth={userToken}>
                <Product />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/editprofile"
            element={
              <ProtectedRouter isAuth={userToken}>
                <Profile />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/changepassword"
            element={
              <ProtectedRouter isAuth={userToken}>
                <ChangePassword />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/product/:id"
            element={
              <ProtectedRouter isAuth={userToken}>
                <ProductItem />
              </ProtectedRouter>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
