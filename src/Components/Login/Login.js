import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../Redux/Action/Action";
import bcrypt from "bcryptjs";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/style.scss";

const Login = () => {
  const users = useSelector((state) => state.ragisterusers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
  });


  const handleSubmit = async (values) => {
    const user = users.find((item) => item.email === values.email);

    if (!user) {
      toast.error("Email is not in use");
      return;
    }

    bcrypt.compare(values.password, user.password, function (err, isMatch) {
      if (err) {
        console.log("error");
      } else if (!isMatch) {
        toast.error("Password not match");
      } else {
        dispatch(signInAction(users, values));
        navigate("/user/product");
        toast.success("Login successfuly");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting, values }) => (
              <div>
                <div className="row mb-5">
                  <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Login Form</h1>
                  </div>
                </div>
                <Form>
                  <div className="form-group">
                    <label htmlFor="email" className="label">
                      Email
                    </label>
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

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Submit
                  </button>
                </Form>
              </div>
            )}
          </Formik>
          <p>Need an Account? 
            <Link to={"/"}>Sign UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
