import * as Yup from "yup";

export const ChnagePassSchema = Yup.object().shape({
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

export  const SignUpSchema = Yup.object().shape({
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

export const LoginSchema = Yup.object().shape({
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

export const ProfileSchema = Yup.object().shape({
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