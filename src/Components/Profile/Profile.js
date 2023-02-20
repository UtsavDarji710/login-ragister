import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../Redux/Action/Action";
import { ProfileSchema } from "../../Validation/Validation";

const Profile = () => {
  // users get data from state of ragister User
  const users = useSelector((state) => state.ragisterusers);
  // currUSer get data from state of login User
  const crrUser = useSelector((state) => state.loginuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (values.email !== crrUser.email) {
      const arr = users.filter((item) => item.email === values.email);
      
      if (arr.length === 0) {
        dispatch(editProfile(users, values));
        navigate("/user/product");
        toast.success("Details Updated Successfully...!!");
      } else {
        toast.error("Email is Already in use");
      }
    }
  };

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{
              ...crrUser,
            }}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, isSubmitting, values }) => (
              (
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">USer Profile</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstName">FirstName</label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter firstName"
                        autoComplete="off"
                        className={`mt-2 form-control
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
                      <label htmlFor="lastName">LastName</label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter lastName"
                        autoComplete="off"
                        className={`mt-2 form-control
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
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="none"
                        className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="MobileNumber">Mobile Number</label>
                      <Field
                        type="number"
                        name="MobileNumber"
                        placeholder="Enter MobileNumber"
                        autoComplete="off"
                        className={`mt-2 form-control
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

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4 me-2"
                    >

                      Submit
                    </button>
                    <button className="btn btn-primary btn-block mt-4 " onClick={() => navigate("/user/product")}>Back</button>
                  </Form>
                </div>
              )
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
