import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changepassword } from "../../Redux/Action/Action";
import {  toast } from 'react-toastify';
import { ChnagePassSchema } from "../../Validation/Validation";
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs";

const ChangePassword = () => {
  // users get data from state of ragister User
  const users = useSelector((state) => state.ragisterusers);

  // currUSer get data from state of login User
  const currUSer = useSelector((state) => state.loginuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const getpass = currUSer.password;

    // Compare with given value of current password with and localstorage of password
    const currMatch = await bcrypt.compare(values.currpassword, getpass);

    if (currMatch) {

      // Compare with given value of new password with and localstorage of password
      const currMatch1 = await bcrypt.compare(values.newpassword, getpass);

      if (currMatch1) {
        toast.error("New Password is Same");
      } else {
        dispatch(changepassword(users, currUSer.id, values));
        navigate("/user/product");
        toast.success("Password change successfuly");
        
      }
    }
    else{
      toast.error("Current password is not same");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{
              currpassword: "",
              newpassword: "",
              ConfirmPassword: "",
            }}
            validationSchema={ChnagePassSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting, values }) => (
              <div>
                <div className="row mb-5">
                  <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Change Password</h1>
                  </div>
                </div>
                <Form>
                  <div className="form-group">
                    <label htmlFor="currpassword">Current Password</label>
                    <Field
                      type="password"
                      name="currpassword"
                      placeholder="Enter Current password"
                      autoComplete="off"
                      className={`mt-2 form-control
                        ${
                          touched.currpassword && errors.currpassword
                            ? "is-invalid"
                            : ""
                        }`}
                    />

                    <ErrorMessage
                      component="div"
                      name="currpassword"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newpassword" className="mt-3">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="newpassword"
                      autoComplete="off"
                      placeholder="Enter password"
                      className={`mt-2 form-control
                        ${
                          touched.newpassword && errors.newpassword
                            ? "is-invalid"
                            : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ConfirmPassword" className="mt-3">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="ConfirmPassword"
                      autoComplete="off"
                      placeholder="Enter ConfirmPassword"
                      className={`mt-2 form-control
                        ${
                          touched.ConfirmPassword && errors.ConfirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="ConfirmPassword"
                      className="invalid-feedback"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4 me-2"
                  >
                    Submit
                  </button>
                  <button className="btn btn-primary btn-block mt-4" onClick={() => navigate("/user/product")}>Back</button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
