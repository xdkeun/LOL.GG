import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

function Find() {
  const { param } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [puuid, setPuuid] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 첫 번째 API 호출
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${param}?api_key=${API_KEY}`
      )
      .then(function (response) {
        setPuuid(response.data.puuid);
      })
      .catch(function (error) {
        alert(error);
      });
  }, [param]);

  useEffect(() => {
    // puuid 값이 변경될 때마다 실행될 함수
    if (puuid) {
      finalSearch();
    }
  }, [puuid]);

  function finalSearch() {
    // 두 번째 API 호출
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`
      )
      .then(function (response) {
        setNickname(response.data.name);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  return <div>{nickname}</div>;
}

export default Find;
