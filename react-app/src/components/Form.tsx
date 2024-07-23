import React, { useState } from "react";
import axios from "axios";

const Form: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/", { email });
      console.log("User Created:", response.data);
      setEmail("");
    } catch (err) {
      console.error("Error Creating User:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create User
      </button>
    </form>
  );
};

export default Form;
