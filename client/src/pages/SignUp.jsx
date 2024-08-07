import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";

const SignUp = () => {
  const [formData, setFormData] = useState({
    profile: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="container signUp-container">
      <h2>Sign Up</h2>
      <form>
        <div>
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, profile: e.target.files[0] })
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
            onChange={(isValid) => console.log(isValid)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
