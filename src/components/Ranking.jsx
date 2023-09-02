import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=${page}&api_key=${API_KEY}`
      )
      .then(function (response) {
        setRanking(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);
  return (
    <RankingContent>
      <RankingRow style={{ backgroundColor: "#318eef", color: "white" }}>
        <Rank>순위</Rank>
        <SummonerName>소환사명</SummonerName>
        <Tier>티어</Tier>
        <LP>LP</LP>
        <WinRate>승률</WinRate>
      </RankingRow>
      {ranking.map((ranking, index) => (
        <RankingRow style={{ borderBottom: "1px solid black" }}>
          <Rank>{index + 1}</Rank>
          <Link to={`/find/${ranking.summonerName}`}>
            <SummonerName>{ranking.summonerName}</SummonerName>
          </Link>
          <Tier>
            {ranking.tier} {ranking.rank}
          </Tier>
          <LP>{ranking.leaguePoints}LP</LP>
          <WinRate>
            {ranking.wins}승 {ranking.losses}패 (
            {((ranking.wins / (ranking.wins + ranking.losses)) * 100).toFixed(
              2
            )}
            %)
          </WinRate>
        </RankingRow>
      ))}
    </RankingContent>
  );
}

const RankingContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const RankingRow = styled.div`
  display: flex;
  width: 800px;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Rank = styled.p`
  width: 70px;
  padding: 8px;
  box-sizing: border-box;
`;

const SummonerName = styled.p`
  width: 190px;
  padding: 8px;
  box-sizing: border-box;
`;

const Tier = styled.p`
  width: 130px;
  padding: 8px;
  box-sizing: border-box;
`;

const LP = styled.p`
  width: 110px;
  padding: 8px;
  box-sizing: border-box;
`;

const WinRate = styled.p`
  width: 300px;
  padding: 8px;
  box-sizing: border-box;
`;

export default Ranking;
