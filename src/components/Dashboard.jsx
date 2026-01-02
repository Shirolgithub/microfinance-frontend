import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ refresh }) => {
  const [stats, setStats] = useState({
    totalBorrowers: 0,
    totalLoan: 0,
  });

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, [refresh]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/borrowers/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body text-center">
              <h5>Total Borrowers</h5>
              <h2>{stats.totalBorrowers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body text-center">
              <h5>Total Loan Amount</h5>
              <h2>₹ {stats.totalLoan}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
