import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import {Alert} from '../alert/alert';

const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const { message, auth, signUp } = authContext;

  //If user is authenticated or registered or a duplicated user
  useEffect(() => {
    if (auth) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [auth, props.history]);

  // State para registrarse
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    role: "admin",
  });
  // extraer de usuario
  const {
    email,
    first_name,
    last_name,
    password,
    password_confirmation,
    role,
  } = user;
  // obtiene la informacion de los campos
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  // Cuando el usuario quiere registrarse
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password_confirmation.trim() === ""
    ) {
       Alert('All fields are required');
      return;
    }

    if (password.length < 6) {
      Alert('Password must have at least 6 characters');
      return;
    }

    if (password !== password_confirmation) {
      Alert('Passwords do not match');
      return;
    }

    signUp({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      role,
    });
  };

  return (
    <div className="login">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password_confirmation"
                    placeholder="Password"
                    value={password_confirmation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
