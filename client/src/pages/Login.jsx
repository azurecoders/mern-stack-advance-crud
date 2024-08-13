import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  accountFailure,
  accountStart,
  accountSuccess,
} from "../redux/userSlice/userSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(accountStart());
      const apiResponse = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await apiResponse.json();
      if (data.success == false) {
        dispatch(accountFailure(data.message));
        return;
      }
      dispatch(accountSuccess(data.message));
      navigate("/");
    } catch (error) {
      dispatch(accountFailure(error.message));
    }
  };
  return (
    <div className="container signUp-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Enter Email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Enter Password..."
          />
        </div>
        <p className="error-msg">{error && error}</p>
        <button
          disabled={loading || formData.email == "" || formData.password == ""}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
