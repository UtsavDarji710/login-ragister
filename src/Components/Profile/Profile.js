import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../Redux/Action/Action";

const Profile = () => {
  const users = useSelector((state) => state.ragisterusers);
  const crrUser = useSelector((state) => state.loginuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (values.email !== crrUser.email) {
      const arr = users.filter((item) => item.email === values.email);
      console.log("same data in sign up : ", arr);
      if (arr.length === 0) {
        dispatch(editProfile(users, values));
        navigate("/user/product");
        toast.success("Details Updated Successfully...!!");
      } else {
        toast.error("Email is Already in use");
      }
    }
  };

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
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            // enableReinitialize={true}
            initialValues={{
              ...crrUser,
            }}
            validationSchema={LoginSchema}
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
                      className="btn btn-primary btn-block mt-4"
                    >

                      Submit
                    </button>
                    <button onClick={() => navigate("/user/product")}>Back</button>
                  </Form>
                </div>
              )
            )}
          </Formik>
          <p>
            <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
