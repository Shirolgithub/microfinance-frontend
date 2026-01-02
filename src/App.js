import React, { useState } from "react";
import AddBorrower from "./components/AddBorrower";
import BorrowerList from "./components/BorrowerList";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <Dashboard refresh={refresh} />
      <AddBorrower onBorrowerAdded={() => setRefresh(!refresh)} />
      <BorrowerList refresh={refresh} />
    </>
  );
}

export default App;
