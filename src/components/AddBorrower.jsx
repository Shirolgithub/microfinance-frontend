import React, { useState } from "react";
import API from "../api";

const AddBorrower = ({ onBorrowerAdded }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    loanAmount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/borrowers/add", {
        name: form.name,
        phone: form.phone,
        loanAmount: Number(form.loanAmount),
      });

      alert("Borrower added successfully");
      setForm({ name: "", phone: "", loanAmount: "" });

      // 🔥 Auto refresh list + dashboard
      if (onBorrowerAdded) {
        onBorrowerAdded();
      }
    } catch (error) {
      alert("Error adding borrower");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Borrower</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="loanAmount"
          placeholder="Loan Amount"
          value={form.loanAmount}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Borrower</button>
      </form>
    </div>
  );
};

export default AddBorrower;
