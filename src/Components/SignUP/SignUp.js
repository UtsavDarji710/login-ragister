import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../Redux/Action/Action";
import {  toast } from 'react-toastify';
import {SignUpSchema } from '../../Validation/Validation'
import 'react-toastify/dist/ReactToastify.css';
import '../../style/style.scss'

const SignUp = () => {
  // users get data from state of ragister User
  const users = useSelector((state) => state.ragisterusers);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = (values) => {
    // filter data if email is same
    const arr = users.filter((item) => item.email === values.email);
    if (arr.length === 0) {
      dispatch(signUpAction(users, values));
      navigate("/login");
      toast.success("Sign Up Successfully..!!")
    } else {
      toast.error("Email is Already in use..!!");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 ">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              MobileNumber: "",
              password: "",
              ConfirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {
              ({ touched, errors, isSubmitting, values }) => (
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5 title">SignUp Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstName" className="label">FirstName</label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter firstName"
                        autoComplete="off"
                        className={`mt-2 field form-control
                          ${
                            touched.firstName && errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="firstName"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="label">LastName</label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter lastName"
                        autoComplete="off"
                        className={`mt-2 field form-control
                          ${
                            touched.lastName && errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="lastName"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="label">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="none"
                        className={`mt-2 field form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="MobileNumber" className="label">Mobile Number</label>
                      <Field
                        type="number"
                        name="MobileNumber"
                        placeholder="Enter MobileNumber"
                        autoComplete="off"
                        className={`mt-2 field form-control
                          ${
                            touched.MobileNumber && errors.MobileNumber
                              ? "is-invalid"
                              : ""
                          }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="MobileNumber"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="mt-3 label">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Enter password"
                        className={`mt-2 field form-control
                          ${
                            touched.password && errors.password
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
                      <label htmlFor="ConfirmPassword" className="mt-3 label">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="ConfirmPassword"
                        autoComplete="off"
                        placeholder="Enter ConfirmPassword"
                        className={`mt-2 field form-control
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
                      className="btn btn-primary btn-block mt-4 "
                    >
                      Submit
                    </button>
                  </Form>
                </div>
              )
            }
            
          </Formik>
          <p className="d-flex justify-content-center">Already a user? 
            <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
  //   }
};

export default SignUp;
