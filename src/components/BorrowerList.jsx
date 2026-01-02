import React, { useEffect, useState } from "react";
import API from "../api";

const BorrowerList = ({ refresh }) => {
  const [borrowers, setBorrowers] = useState([]);
  const [editBorrower, setEditBorrower] = useState(null);

  useEffect(() => {
    fetchBorrowers();
    // eslint-disable-next-line
  }, [refresh]);

  const fetchBorrowers = async () => {
    try {
      const res = await API.get("/borrowers");
      setBorrowers(res.data);
    } catch (error) {
      console.error("Error fetching borrowers", error);
    }
  };

  const deleteBorrower = async (id) => {
    if (!window.confirm("Delete this borrower?")) return;

    try {
      await API.delete(`/borrowers/${id}`);
      fetchBorrowers(); // 🔥 auto refresh
    } catch (error) {
      alert("Error deleting borrower");
      console.error(error);
    }
  };

  const updateBorrower = async () => {
    try {
      await API.put(`/borrowers/${editBorrower._id}`, {
        name: editBorrower.name,
        phone: editBorrower.phone,
        loanAmount: Number(editBorrower.loanAmount),
      });

      alert("Borrower updated successfully");
      setEditBorrower(null);
      fetchBorrowers();
    } catch (error) {
      alert("Error updating borrower");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Borrower List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Loan Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowers.map((b) => (
            <tr key={b._id}>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.loanAmount}</td>
              <td>
                <button onClick={() => setEditBorrower(b)}>Edit</button>{" "}
                <button
                  style={{ color: "red" }}
                  onClick={() => deleteBorrower(b._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== EDIT FORM ===== */}
      {editBorrower && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
          }}
        >
          <h3>Edit Borrower</h3>

          <input
            value={editBorrower.name}
            onChange={(e) =>
              setEditBorrower({ ...editBorrower, name: e.target.value })
            }
          />
          <br />
          <br />

          <input
            value={editBorrower.phone}
            onChange={(e) =>
              setEditBorrower({ ...editBorrower, phone: e.target.value })
            }
          />
          <br />
          <br />

          <input
            value={editBorrower.loanAmount}
            onChange={(e) =>
              setEditBorrower({
                ...editBorrower,
                loanAmount: e.target.value,
              })
            }
          />
          <br />
          <br />

          <button onClick={updateBorrower}>Update</button>{" "}
          <button onClick={() => setEditBorrower(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BorrowerList;
