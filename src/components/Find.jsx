import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";

function Find() {
  const { param } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [id, setId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [puuid, setPuuid] = useState("");
  const [nickname, setNickname] = useState("");
  const [tier, setTier] = useState("");
  const [rank, setRank] = useState("");
  const [name, setName] = useState("");
  const [wins, setWins] = useState("");
  const [losses, setLosses] = useState("");
  useEffect(() => {
    //summonerv4Api(id, accountId, puuid)
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${param}?api_key=${API_KEY}`
      )
      .then(function (response) {
        setId(response.data.id);
        setAccountId(response.data.accountId);
        setPuuid(response.data.puuid);
      })
      .catch(function (error) {
        alert(error);
      });
  }, [param]);

  useEffect(() => {
    // puuid 값이 변경될 때마다 실행될 함수
    if (puuid) {
      leaguev4Api();
    }
  }, [puuid]);

  //티어, 소환사명, 승리, 패배
  function leaguev4Api() {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
      )
      .then(function (response) {
        setTier(response.data[0].tier);
        setRank(response.data[0].rank);
        setName(response.data[0].summonerName);
        setWins(response.data[0].wins);
        setLosses(response.data[0].losses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <p>{name}</p>
      <p>{tier} {rank}</p>
      <p>{wins}승 {losses}패</p>
    </div>
  );
}

export default Find;
