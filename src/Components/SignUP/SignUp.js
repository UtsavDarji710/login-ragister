import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../Redux/Action/Action";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/style.scss'

const SignUp = () => {
  const users = useSelector((state) => state.ragisterusers);
  console.log("Signup users : ", users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("firstname is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string()
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email address format"
      )
      .email("Invalid email address format")
      .required("Email is required"),
    MobileNumber: Yup.string()
      .min(10, "MobileNumber is must be 10 number")
      .max(10, "MobileNumber is must be 10 number")
      .required("MobileNumber is required"),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password does not match")
      .required("ConfirmPassword is required"),
  });

  const handleSubmit = (values) => {

    const arr = users.filter((item) => item.email === values.email);
    if (arr.length === 0) {
      dispatch(signUpAction(users, values));
      navigate("/login");
      toast.success("Sign Up Success")
    } else {
      toast.error("Email is Already in use");
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
            validationSchema={LoginSchema}
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
                      className="btn btn-primary btn-block mt-4"
                    >
                      Submit
                    </button>
                  </Form>
                </div>
              )
            }
            
          </Formik>
          <p>Already a user? 
            <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
  //   }
};

export default SignUp;
