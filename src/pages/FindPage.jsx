import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import SummonerInfo from "../components/SummonerInfo";
import SummonerTier from "../components/SummonerTier";
import Loading from "../components/Loading";
import GameRecord from "../components/GameRecord";

function FindPage() {
  const { param } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [id, setId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [puuid, setPuuid] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [icon, setIcon] = useState("");
  const [soloRankTier, setSoloRankTier] = useState("unranked");
  const [soloRank, setSoloRank] = useState("");
  const [soloRankWins, setSoloRankWins] = useState("");
  const [soloRankLosses, setSoloRankLosses] = useState("");
  const [soloRankPoint, setSoloRankPoint] = useState("");
  const [freeRankTier, setFreeRankTier] = useState("unranked");
  const [freeRank, setFreeRank] = useState("");
  const [freeRankWins, setFreeRankWins] = useState("");
  const [freeRankLosses, setFreeRankLosses] = useState("");
  const [freeRankPoint, setFreeRankPoint] = useState("");
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
        setLevel(response.data.summonerLevel);
        setIcon(response.data.profileIconId);
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
        // 솔로랭크는 RANKED_SOLO_5x5
        // 자유랭크는 RANKED_FLEX_SR

        setName(response.data[0].summonerName);
        response.data.forEach((data) => {
          if (data.queueType === "RANKED_SOLO_5x5") {
            setSoloRankTier(data.tier);
            setSoloRank(data.rank);
            setSoloRankWins(data.wins);
            setSoloRankLosses(data.losses);
            setSoloRankPoint(data.leaguePoints);
          } else if (data.queueType === "RANKED_FLEX_SR") {
            setFreeRankTier(data.tier);
            setFreeRank(data.rank);
            setFreeRankWins(data.wins);
            setFreeRankLosses(data.losses);
            setFreeRankPoint(data.leaguePoints);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <Search />
        {name === "" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            <SummonerInfo name={name} level={level} icon={icon} />
            <SummonerTier
              soloRankTier={soloRankTier}
              soloRank={soloRank}
              soloRankPoint={soloRankPoint}
              soloRankWins={soloRankWins}
              soloRankLosses={soloRankLosses}
              freeRankTier={freeRankTier}
              freeRank={freeRank}
              freeRankPoint={freeRankPoint}
              freeRankWins={freeRankWins}
              freeRankLosses={freeRankLosses}
            />
            <GameRecord puuid={puuid} API_KEY={API_KEY}/>
          </>
        )}
      </div>
    </div>
  );
}
export default FindPage;
