import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Search from "./Search";
import rose from "../assets/summonerIcons/rose.png";
import challenger from "../assets/tiers/challenger.png";
import grandmaster from "../assets/tiers/grandmaster.png";
import master from "../assets/tiers/master.png";
import diamond from "../assets/tiers/diamond.png";
import emerald from "../assets/tiers/emerald.png";
import platinum from "../assets/tiers/platinum.png";
import gold from "../assets/tiers/gold.png";
import silver from "../assets/tiers/silver.png";
import bronze from "../assets/tiers/bronze.png";
import iron from "../assets/tiers/iron.png";
const tierImages = {
  challenger: challenger,
  grandmaster: grandmaster,
  master: master,
  diamond: diamond,
  emerald: emerald,
  platinum: platinum,
  gold: gold,
  silver: silver,
  bronze: bronze,
  iron: iron,
};

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
  const [level, setLevel] = useState("");
  const [point, setPoint] = useState("");
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
        console.log(response.data[0].queueType)
        // 솔로랭크는 RANKED_SOLO_5x5
        // 자유랭크는 RANKED_FLEX_SR
        setTier(response.data[0].tier);
        setRank(response.data[0].rank);
        setName(response.data[0].summonerName);
        setWins(response.data[0].wins);
        setLosses(response.data[0].losses);
        setPoint(response.data[0].leaguePoints);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <FindContent>
      <Search />
      <SummonerInfo>
        <div style={{ position: "relative" }}>
          <SummonerIconImg src={rose} alt="소환사 아이콘" />
          <SummonerLevel>{level}</SummonerLevel>
        </div>
        <div
          style={{
            height: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontSize: "20px", marginRight: "10px" }}>
              {name}
            </span>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "5px",
              }}
            >
              친구 등록하기
            </button>
          </div>
          <button
            style={{
              backgroundColor: "#318eef",
              color: "white",
              padding: "10px 0",
            }}
          >
            인게임 정보
          </button>
        </div>
      </SummonerInfo>

      <SummonerTierContent>
        <SummonerTierArticle>
          <RankType>솔로랭크</RankType>
          <RankInfo>
            <TierImg src={tierImages[tier.toLowerCase()]} alt="티어 사진" />
            <RankTierLP>
              <RankTier>
                {tier} {rank}
              </RankTier>
              <RankLP>{point} LP</RankLP>
            </RankTierLP>
            <RankWinsLossesInfo>
              <WinsLosses>
                {wins}승 {losses}패
              </WinsLosses>

              <WinningPercent>
                승률 {Math.round((wins / (wins + losses)) * 100)}%
              </WinningPercent>
            </RankWinsLossesInfo>
          </RankInfo>
        </SummonerTierArticle>

        <SummonerTierArticle>
          <RankType>솔로랭크</RankType>
          <RankInfo>
            <TierImg src={tierImages[tier.toLowerCase()]} alt="티어 사진" />
            <RankTierLP>
              <RankTier>
                {tier} {rank}
              </RankTier>
              <RankLP>{point} LP</RankLP>
            </RankTierLP>
            <RankWinsLossesInfo>
              <WinsLosses>
                {wins}승 {losses}패
              </WinsLosses>

              <WinningPercent>
                승률 {Math.round((wins / (wins + losses)) * 100)}%
              </WinningPercent>
            </RankWinsLossesInfo>
          </RankInfo>
        </SummonerTierArticle>
      </SummonerTierContent>
    </FindContent>
  );
}

const FindContent = styled.section`
  padding: 20px;
`;

const SummonerInfo = styled.header`
  height: 100px;
  display: flex;
  margin: 20px 0;
`;

const SummonerIconImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
`;

const SummonerLevel = styled.span`
  position: absolute;
  bottom: -10px;
  left: 35px;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 5px;
  border-radius: 25%;
`;

const SummonerTierContent = styled.section`
  display: flex;
  gap: 50px;
`;
const SummonerTierArticle = styled.article`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 20px;
  border-radius: 20px;
`;
const RankType = styled.span`
  height: 35px;
  font-size: 18px;
`;

const RankInfo = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TierImg = styled.img`
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  padding: 10px;
  box-sizing: border-box;
`;

const RankTierLP = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RankTier = styled.span`
  font-size: 20px;
`;

const RankLP = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`;

const RankWinsLossesInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
`;

const WinsLosses = styled.span``;

const WinningPercent = styled.span`
  text-align: right;
`;

export default Find;
