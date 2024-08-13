import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useSelector, useDispatch } from "react-redux";
import {
  accountFailure,
  accountStart,
  accountSuccess,
} from "../redux/userSlice/userSlice.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [formData, setFormData] = useState({
    profilePic: "",
    name: "",
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
      const dataToBeSend = new FormData();
      dataToBeSend.append("profilePic", formData.profilePic);
      dataToBeSend.append("name", formData.name);
      dataToBeSend.append("email", formData.email);
      dataToBeSend.append("password", formData.password);

      const apiResponse = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: dataToBeSend,
      });

      const data = await apiResponse.json();
      if (data.success == false) {
        dispatch(accountFailure(data.message));
        return;
      }
      dispatch(accountSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(accountFailure(error.message));
    }
  };

  return (
    <div className="container signUp-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, profilePic: e.target.files[0] })
            }
            id="profilePic"
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            placeholder="Enter Name..."
          />
        </div>
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
        <div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital"]}
            minLength={8}
            value={formData.password}
            onChange={(isValid) => setIsValidPassword(!isValid)}
          />
        </div>
        <p className="error-msg">{error && error}</p>
        <button
          disabled={
            loading ||
            isValidPassword ||
            formData.profilePic == "" ||
            formData.name == "" ||
            formData.email == "" ||
            formData.password == ""
          }
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
