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

  //everytime getAllData function render
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  //get a userToken as auth from state
  const userToken = useSelector((state) => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user/product"
            element={
              <ProtectedRouter auth={userToken}>
                <Product />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/editprofile"
            element={
              <ProtectedRouter auth={userToken}>
                <Profile />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/changepassword"
            element={
              <ProtectedRouter auth={userToken}>
                <ChangePassword />
              </ProtectedRouter>
            }
          />
          <Route
            path="/user/product/:id"
            element={
              <ProtectedRouter auth={userToken}>
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
