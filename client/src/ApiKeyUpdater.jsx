import React, { useState, useEffect } from "react";
import axios from "axios";

const ApiKeyUpdater = () => {
  const [telegramToken, setTelegramToken] = useState("");
  const [openWeatherMapApiKey, setOpenWeatherMapApiKey] = useState("");

  useEffect(() => {
    // Fetch subscribers from the API endpoint
    axios
      .get("http://localhost:5000/admin/api-keys")
      .then((response) => {
        console.log(response.data.api_keys);
        setTelegramToken(response?.data.api_keys[0]?.TELEGRAM_TOKEN);
        setOpenWeatherMapApiKey(response?.data.api_keys[0]?.OPEN_WEATHERMAP_API_KEY);
      })
      .catch((error) => {
        console.error("Error fetching subscribers:", error);
      });
  }, []);

  const updateTelegramToken = () => {
    axios
      .patch("http://localhost:5000/admin/telegram-token", {
        token: telegramToken,
      })
      .then(() => {
        console.log("Telegram token updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating Telegram token:", error);
      });
  };

  const updateOpenWeatherMapApiKey = () => {
    axios
      .patch("http://localhost:5000/admin/openweathermap-api-key", {
        apiKey: openWeatherMapApiKey,
      })
      .then(() => {
        console.log("OpenWeatherMap API key updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating OpenWeatherMap API key:", error);
      });
  };

  return (
    <div>
      <h3>Update API Keys</h3>
      <div style={{ color: "black" }}>
        <label>
          Telegram Token:
          <br/>
          <input
          style={{width:'50vw'}}
            type="text"
            value={telegramToken}
            onChange={(e) => setTelegramToken(e.target.value)}
          />
        </label>
        <button style={{backgroundColor:'green',width:'25vw',color:'white'}} onClick={updateTelegramToken}>Update Telegram Token</button>
      </div>
      <div style={{ color: "black" }}>
        <label>
          OpenWeatherMap API Key:
          <br/>
          <input
          style={{width:'50vw'}}
            type="text"
            value={openWeatherMapApiKey}
            onChange={(e) => setOpenWeatherMapApiKey(e.target.value)}
          />
        </label>
        <button style={{backgroundColor:'green',width:'25vw',color:'white'}} onClick={updateOpenWeatherMapApiKey}>
          Update OpenWeather API Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeyUpdater;
