import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiKeyUpdater from './ApiKeyUpdater'

const AdminPanel = () => {
  const [subscribers, setSubscribers] = useState([]);

  const fetchSubscribers = () => {
    // Fetch subscribers from the API endpoint
    axios
      .get("http://localhost:5000/admin/subscribers")
      .then((response) => {
        setSubscribers(response.data.subscribers);
      })
      .catch((error) => {
        console.error("Error fetching subscribers:", error);
      });
  };
  

  useEffect(() => {
    // Fetch subscribers when the component mounts
    fetchSubscribers();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleDelete = (chatId) => {
    // Delete subscriber by chatId
    axios
      .delete(`http://localhost:5000/admin/subscribers/${chatId}`)
      .then(() => {
        // After successful deletion, fetch updated list of subscribers
        fetchSubscribers();
      })
      .catch((error) => {
        console.error("Error deleting subscriber:", error);
      });
  };

  const handleBlock = (chatId) => {
    // Delete subscriber by chatId
    axios
      .patch(`http://localhost:5000/admin/subscribers/${chatId}`)
      .then(() => {
        // After successful deletion, fetch updated list of subscribers
        fetchSubscribers();
      })
      .catch((error) => {
        console.error("Error deleting subscriber:", error);
      });
  };

  return (
    <div>
      <ApiKeyUpdater/>
      <h3>Subscribers List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
  <thead>
    <tr style={{color:'black', backgroundColor: '#f2f2f2' }}>
      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Chat Id</th>
      <th style={{ padding: '10px', border: '1px solid #ddd' }}>UserName</th>
      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {subscribers.map((subscriber) => (
      <tr key={subscriber._id}>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subscriber.chatId}</td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{subscriber.username}</td>
        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
        <button
            style={{marginRight:'10px', color: 'white', backgroundColor:   subscriber.blocked?"Green":"Blue", border: 'none', padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => handleBlock(subscriber.chatId)}
          >
            {subscriber.blocked?"UnBlock":"Block"}
          </button>
          <button
            style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
            onClick={() => handleDelete(subscriber.chatId)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


    </div>
  );
};

export default AdminPanel;
