import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/Action/Action";

const Navbar = () => {
  // currUSer get data from state of login User
  const currUser = useSelector((state) => state.loginuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className="navbar-dark bg-dark ">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div
              className="navbar-brand"
              onClick={() => navigate("/user/product")}
            >
              Products
            </div>

            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li className="dropdown-item">
                      {currUser.firstName + " " + currUser.lastName}
                    </li>
                    <li className="dropdown-item">{currUser.email}</li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/user/editprofile")}
                    >
                      Edit Profile
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/user/changepassword")}
                    >
                      Change Password
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        handlelogout();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
