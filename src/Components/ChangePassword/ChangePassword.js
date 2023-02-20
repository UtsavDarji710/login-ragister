import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changepassword } from "../../Redux/Action/Action";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs";

const ChangePassword = () => {
  const users = useSelector((state) => state.ragisterusers);
  const currUSer = useSelector((state) => state.loginuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    currpassword: Yup.string()
      .min(8, "Password must be 8 characters at minimum")
      .required("Password is required"),
    newpassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("newpassword"), null], "Password does not match")
      .required("ConfirmPassword is required"),
  });


  const handleSubmit = async (values) => {
    const getpass = currUSer.password;

    console.log("getpass: ", getpass)

    console.log("values currpassword: ", values.currpassword);

    const currMatch = await bcrypt.compare(values.currpassword, getpass);

    if (currMatch) {
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
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting, values }) => (
              // !isSubmitting ? (
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
                    className="btn btn-primary btn-block mt-4"
                  >
                    Submit
                  </button>
                  <button onClick={() => navigate("/user/product")}>Back</button>
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
