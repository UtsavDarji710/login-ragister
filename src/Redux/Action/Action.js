import {
  SIGN_UP,
  SIGN_IN,
  GET_ALL_DATA,
  EDIT_PROFILE_DATA,
  CHANGE_PASSWORD,
  LOG_OUT,
} from "./ActionConstant";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

//get All data
export const getAllData = () => {
  // in data getvalues or items from localstorage where key is Users
  let data = JSON.parse(localStorage.getItem("Users"));
  // in data getvalues or items from localstorage where key is Auth_Users
  let authData = JSON.parse(localStorage.getItem("Auth_Users"));

  if (!data) {
    localStorage.setItem("Users", JSON.stringify([]));
    data = [];
  }
  if (!authData) {
    localStorage.setItem(
      "Auth_User",
      JSON.stringify({ auth: false, user: {} })
    );
    authData = {
      auth: false,
      user: {},
    };
  }

  return {
    type: GET_ALL_DATA,
    payload: {
      users: data,
      currUser: authData.user,
      auth: authData.auth,
    },
  };
};

//SIGN UP
export const signUpAction = (items, data) => {

  const id = uuidv4();

  //encrypt password using bcrypt
  let salt = bcrypt.genSaltSync(10);
  let encrypass = bcrypt.hashSync(data.password, salt);

  let newUser = { ...data, id, password: encrypass };
  // delete ConfirmPassword of newUser for not store in localStorage
  delete newUser.ConfirmPassword;

  let newData = [...items, { ...newUser }];

  localStorage.setItem("Users", JSON.stringify(newData));
  localStorage.setItem(
    "Auth_Users",
    JSON.stringify({ auth: true, user: { ...newUser } })
  );
  return {
    type: SIGN_UP,
    payload: {
      users: newData,
      currUser: newUser,
      auth: true,
    },
  };
};

// Login 
export const signInAction = (items, values) => {
  //filter data if email is same
  const filterdata = items.filter((item) => item.email === values.email);

  localStorage.setItem(
    "Auth_Users",
    JSON.stringify({ auth: true, user: { ...filterdata[0] } })
  );

  return {
    type: SIGN_IN,
    payload: {
      loginuser: { ...filterdata[0] },
      auth: true,
    },
  };
};

//EDIT PROFILE
export const editProfile = (users, values) => {
  // if id of user and id of values same than return values
  const editedData = users.map((data) => {
    if (data.id === values.id) {
      return { ...values };
    } else {
      return data;
    }
  });

  localStorage.setItem("Users", JSON.stringify(editedData));
  localStorage.setItem(
    "Auth_Users",
    JSON.stringify({ auth: true, user: { ...values } })
  );

  return {
    type: EDIT_PROFILE_DATA,
    payload: {
      users: editedData,
      currUser: values,
    },
  };
};

export const changepassword = (users, id, values) => {
  let changepass = {};

  //encrypt password using bcrypt
  let salt = bcrypt.genSaltSync(10);
  let encryptPass = bcrypt.hashSync(values.newpassword, salt);

  // if id of user and id of items same than return data and with new encrpted password 
  const changepassdata = users.map((data) => {
    if (data.id === id) {
      changepass = { ...data, password: encryptPass };

      return changepass;
    } else {
      return data;
    }
  });
  // delete confirmPassword
  delete changepassdata.ConfirmPassword;

  localStorage.setItem("Users", JSON.stringify([...changepassdata]));
  localStorage.setItem(
    "Auth_Users",
    JSON.stringify({ auth: true, user: { ...changepass } })
  );

  return {
    type: CHANGE_PASSWORD,
    payload: {
      users: changepassdata,
      currUser: { ...changepass },
      auth: true,
    },
  };
};

export const logoutAction = () => {
  localStorage.setItem("Auth_Users", JSON.stringify({ auth: false, user: {} }));
  return {
    type: LOG_OUT,
    payload: {},
  };
};
