import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the backend API after successful authentication
    axios.get("/api/user-data").then((response) => {
      setUserData(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
};

export default Dashboard;
