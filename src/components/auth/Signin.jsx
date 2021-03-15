import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import {Alert} from '../alert/alert';

const Signin = (props) => {
  const authContext = useContext(AuthContext);
  const {auth, signIn } = authContext;

  useEffect(() => {
    if (auth) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [auth, props.history]);

  // State para iniciar sesión
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // extraer de usuario
  const { email, password } = user;
  // obtiene la informacion de los campos
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  // Cuando el usuario quiere iniciar sesión
  const handleSubmit = (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      Alert("All fields are required");
      return;
    }

    signIn({
      email,
      password,
      grant_type: process.env.REACT_APP_BACKEND_GRANT_TYPE,
      client_id: process.env.REACT_APP_BACKEND_CLIENT_ID,
      client_secret: process.env.REACT_APP_BACKEND_CLIENT_SECRET,
      scope: process.env.REACT_APP_BACKEND_SCOPE,
    });
  };

  return (
    <div className="login">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <label>E-mail / Username</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="E-mail / Username"
                  />
                </div>
                <div className="col-md-12">
                  <label>Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <div className="col-md-12">
                  <button className="btn">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
