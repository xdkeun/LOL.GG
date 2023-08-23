import axios from "axios";
import React, { useState } from "react";
function Test() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [puuid, setPuuid] = useState("");

  axios
    .get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/hideonbush?api_key=${API_KEY}`
    )
    .then(function (response) {
      setPuuid(response.data.puuid);
    })
    .catch(function (error) {
      alert(error);
    });

  function Search() {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
      )
      .then(function (response) {
        alert(response.data.name);
      })
      .catch(function (error) {
        alert(error);
      });
  }
  return (
    <div>
      <button onClick={Search}>Search</button>
    </div>
  );
}
export default Test;
