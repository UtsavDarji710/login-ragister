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
  let data = JSON.parse(localStorage.getItem("Users"));
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

//add cart action
export const signUpAction = (items, data) => {

  const id = uuidv4();

  let salt = bcrypt.genSaltSync(10);
  let encrypass = bcrypt.hashSync(data.password, salt);
  console.log("Encrypted2 password : ", encrypass);

  let newUser = { ...data, id, password: encrypass };
  delete newUser.ConfirmPassword;

  let newData = [...items, { ...newUser }];

  localStorage.setItem("Users", JSON.stringify(newData));
  localStorage.setItem(
    "Auth_User",
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

// Login item action
export const signInAction = (items, values) => {
  const arr = items.filter((item) => item.email === values.email);
  console.log("sign in arr: ",{...arr})

  localStorage.setItem(
    "Auth_User",
    JSON.stringify({ auth: true, user: { ...arr[0] } })
  );

  return {
    type: SIGN_IN,
    payload: {
      currUser: { ...arr[0] },
      auth: true,
    },
  };
};

//get all data
export const editProfile = (users, values) => {
  const arr = users.map((data) => {
    if (data.id === values.id) {
      return { ...values };
    } else {
      return data;
    }
  });
  console.log("Arr:", arr);

  localStorage.setItem("Users", JSON.stringify(arr));
  localStorage.setItem(
    "Auth_User",
    JSON.stringify({ auth: true, user: { ...values } })
  );

  return {
    type: EDIT_PROFILE_DATA,
    payload: {
      users: arr,
      currUser: values,
    },
  };
};

export const changepassword = (users, id, values) => {
  let changepass = {};
  let salt = bcrypt.genSaltSync(10);
  let encryptPass = bcrypt.hashSync(values.newpassword, salt);

  const arr = users.map((data) => {
    if (data.id === id) {
      changepass = { ...data, password: encryptPass };

      return changepass;
    } else {
      return data;
    }
  });
  delete arr.ConfirmPassword;

  localStorage.setItem("Users", JSON.stringify([...arr]));
  localStorage.setItem(
    "Auth_User",
    JSON.stringify({ auth: true, user: { ...changepass } })
  );

  return {
    type: CHANGE_PASSWORD,
    payload: {
      users: arr,
      currUser: { ...changepass },
      auth: true,
    },
  };
};

export const logoutAction = () => {
  localStorage.setItem("Auth_User", JSON.stringify({ auth: false, user: {} }));
  return {
    type: LOG_OUT,
    payload: {},
  };
};
