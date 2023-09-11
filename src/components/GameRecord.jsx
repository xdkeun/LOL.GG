//
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import downBlueIcon from "../assets/icon/icon-arrow-down-blue.svg";
import downRedIcon from "../assets/icon/icon-arrow-down-red.svg";
import champions from "../apis/champions";
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const championImages = importAll(
  require.context("../assets/champions", false, /\.(png|jpe?g|svg)$/)
);

const itemImages = importAll(
  require.context("../assets/items", false, /\.(png|jpe?g|svg)$/)
);

const spellImages = importAll(
  require.context("../assets/summonerSpells", false, /\.(png|jpe?g|svg)$/)
);

// 게임이 몇시간 몇분 몇초 지났는지 출력
function formatGameDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours}시간 `;
  }

  if (minutes > 0) {
    formattedDuration += `${minutes}분 `;
  }

  formattedDuration += `${seconds}초`;

  return formattedDuration.trim();
}

// 게임 끝난 시간(timestamp) 값이 매개변수로 들어오면 현재 시간과 비교하여, 얼마나 지났는지 출력 ex)1시간 전, 5분 전, 15일 전
function getTimeAgo(timestamp) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (timeDifference < minute) {
    return `${Math.floor(timeDifference / 1000)}초 전`;
  } else if (timeDifference < hour) {
    return `${Math.floor(timeDifference / minute)}분 전`;
  } else if (timeDifference < day) {
    return `${Math.floor(timeDifference / hour)}시간 전`;
  } else {
    return `${Math.floor(timeDifference / day)}일 전`;
  }
}

function GameRecord({ puuid, API_KEY }) {
  const [matches, setMatches] = useState([]); // matches 배열로 응답을 저장
  useEffect(() => {
    axios
      .get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`
      )
      .then(function (response) {
        const matchIds = response.data;
        const matchPromises = matchIds.map((matchId) =>
          axios.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
          )
        );

        Promise.all(matchPromises)
          .then((responses) => {
            // 각각의 응답을 matches 배열에 저장
            setMatches(responses.map((response) => response.data));
          })
          .catch(function (error) {
            alert(error);
          });
      })
      .catch(function (error) {
        alert(error);
      });
  }, [puuid, API_KEY]);
  return (
    <GameRecordContent>
      {matches.map((match) => (
        <GameRecordArticle
          key={match.info.gameId}
          style={{
            backgroundColor: match.info.participants.some(
              (participant) =>
                puuid === participant.puuid && participant.win === true
            )
              ? "#86a7ef" // 승리했을 시
              : "#f4a4af", // 패배했을 시
          }}
        >
          <GameRecordType>
            <p style={{ fontWeight: "500", color: "black" }}>
              {match.info.gameMode === "ARAM"
                ? "무작위 총력전"
                : match.info.gameMode}
            </p>
            <p
              style={{
                paddingBottom: "5px",
                borderBottom: "0.5px solid rgba(0,0,0,0.7)",
              }}
            >
              {getTimeAgo(match.info.gameEndTimestamp)}
            </p>
            {match.info.participants.map((participant, index) =>
              puuid === participant.puuid ? (
                participant.win === true ? (
                  <p>승리</p>
                ) : (
                  <p>패배</p>
                )
              ) : null
            )}
            <p>{formatGameDuration(match.info.gameDuration)}</p>
          </GameRecordType>
          {match.info.participants.map((participant, index) =>
            puuid == participant.puuid ? (
              <GameRecordInfo key={index}>
                <GameRecordInfoTop>
                  <GameRecordInfoImgWrapper>
                    <GameRecordInfoImg
                      src={
                        championImages[
                          `${champions[participant.championId]}.png`
                        ]
                      }
                      alt={participant.championName}
                    />
                    <GameRecordInfoLevel>
                      {participant.champLevel}
                    </GameRecordInfoLevel>
                  </GameRecordInfoImgWrapper>
                  <GameRecordInfoRuneSpellWrapper>
                    <GameRecordInfoRuneSpellImg
                      src={spellImages[`${participant.summoner1Id}.png`]}
                      alt=""
                    />
                    <GameRecordInfoRuneSpellImg
                      src={spellImages[`${participant.summoner2Id}.png`]}
                      alt=""
                    />
                  </GameRecordInfoRuneSpellWrapper>
                  <GameRecordInfoKDAWrapper>
                    <GameRecordInfoKDA>
                      {participant.kills}/{participant.deaths}/
                      {participant.assists}
                    </GameRecordInfoKDA>
                    <GameRecordInfoRatio
                      style={{ color: "red", fontWeight: "600" }}
                    >
                      {participant.deaths === 0 ? (
                        "Perfect"
                      ) : (
                        <span
                          style={{
                            color:
                              (participant.kills + participant.assists) /
                                participant.deaths >=
                              4
                                ? "#cc4444"
                                : (participant.kills + participant.assists) /
                                    participant.deaths >=
                                  3
                                ? "#4444cc" // 3 이상인 경우
                                : (participant.kills + participant.assists) /
                                    participant.deaths >=
                                  2
                                ? "#449944" // 2 이상인 경우
                                : "#808080", // 그 외
                          }}
                        >
                          {(
                            (participant.kills + participant.assists) /
                            participant.deaths
                          ).toFixed(2)}{" "}
                          평점
                        </span>
                      )}
                    </GameRecordInfoRatio>
                  </GameRecordInfoKDAWrapper>
                  <GameRecordInfoStatsWrapper>
                    <KillRate>
                      킬관여 {participant.kills + participant.assists}
                    </KillRate>
                    <InfoStats>
                      제어와드 {participant.visionWardsBoughtInGame}
                    </InfoStats>
                    <InfoStats>시야점수 {participant.visionScore}</InfoStats>
                    <InfoStats>
                      CS{" "}
                      {participant.neutralMinionsKilled +
                        participant.totalEnemyJungleMinionsKilled +
                        participant.totalMinionsKilled}{" "}
                      (
                      {(
                        (participant.neutralMinionsKilled +
                          participant.totalEnemyJungleMinionsKilled +
                          participant.totalMinionsKilled) /
                        (match.info.gameDuration / 60)
                      ).toFixed(1)}
                      )
                    </InfoStats>
                  </GameRecordInfoStatsWrapper>
                </GameRecordInfoTop>
                <GameRecordInfoBottom>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <GameRecordInfoItemImg
                      key={i}
                      src={itemImages[`${participant[`item${i}`]}.png`]}
                      alt=""
                    />
                  ))}
                  {participant.pentaKills > 0 && <KillBadge>펜타킬</KillBadge>}

                  {participant.quadraKills > 0 && (
                    <KillBadge>쿼드라킬</KillBadge>
                  )}

                  {participant.tripleKills > 0 && (
                    <KillBadge>트리플킬</KillBadge>
                  )}

                  {participant.doubleKills > 0 && <KillBadge>더블킬</KillBadge>}
                </GameRecordInfoBottom>
              </GameRecordInfo>
            ) : null
          )}

          <GameRecordParticipants>
            <GameRecordTeams>
              {match.info.participants.map((participant) =>
                participant.teamId === 100 ? (
                  <TeamInfo
                    key={participant.summonerId}
                    to={`/find/${participant.summonerName}`}
                  >
                    <TeamImg
                      src={
                        championImages[
                          `${champions[participant.championId]}.png`
                        ]
                      }
                      alt={participant.championName}
                    />
                    <TeamName>{participant.summonerName}</TeamName>
                  </TeamInfo>
                ) : null
              )}
            </GameRecordTeams>
            <GameRecordTeams>
              {match.info.participants.map((participant) =>
                participant.teamId === 200 ? (
                  <TeamInfo
                    key={participant.summonerId}
                    to={`/find/${participant.summonerName}`}
                  >
                    <TeamImg
                      src={
                        championImages[
                          `${champions[participant.championId]}.png`
                        ]
                      }
                      alt={participant.championName}
                    />
                    <TeamName>{participant.summonerName}</TeamName>
                  </TeamInfo>
                ) : null
              )}
            </GameRecordTeams>
          </GameRecordParticipants>
          <GameRecordDetail>
            <img src={downRedIcon} alt="" />
          </GameRecordDetail>
        </GameRecordArticle>
      ))}
    </GameRecordContent>
  );
}

const GameRecordContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
const GameRecordArticle = styled.article`
  display: flex;
  width: 800px;
  justify-content: space-between;
  height: 120px;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 20px;
`;

const GameRecordType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  height: 100px;
  color: rgba(0, 0, 0, 0.5);
`;

const GameRecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
`;

const GameRecordInfoTop = styled.div`
  display: flex;
  gap: 5px;
  height: 75px;
`;

const GameRecordInfoImgWrapper = styled.div`
  position: relative;
`;

const GameRecordInfoImg = styled.img`
  width: 48px;
  height: 48px;
`;

const GameRecordInfoLevel = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px;
  border-radius: 50%;
  box-sizing: border-box;
`;

const GameRecordInfoRuneSpellWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameRecordInfoRuneSpellImg = styled.img`
  width: 22px;
  height: 22px;
`;

const GameRecordInfoKDAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  box-sizing: border-box;
`;

const GameRecordInfoKDA = styled.span`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const GameRecordInfoRatio = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
`;

const GameRecordInfoStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 75px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
`;
const KillRate = styled.div`
  height: 13.5px;
  color: #e84057;
  font-weight: 500;
`;

const InfoStats = styled.div`
  height: 13.5px;
`;

const KillBadge = styled.p`
  background-color: #e84057;
  color: white;
  border-radius: 25px;
  font-size: 12px;
  padding: 4px 8px;
  margin: 0 4px;
`;
const GameRecordInfoBottom = styled.div`
  display: flex;
  gap: 1px;
  height: 25px;
`;

const GameRecordInfoItemImg = styled.img`
  width: 22px;
  height: 25px;
`;

const GameRecordParticipants = styled.div`
  display: flex;
  width: 180px;
  height: 100%;
  color: rgba(0, 0, 0, 0.5);
`;

const GameRecordTeams = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 180px;
`;

const TeamInfo = styled(Link)`
  display: flex;
  height: 100%;
  cursor: pointer;
`;

const TeamImg = styled.img`
  width: 16px;
  height: 16px;
`;

const TeamName = styled.p`
  font-size: 12px;
  width: 80px;
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
  text-overflow: ellipsis; /* 넘칠 경우 "..."로 표시 */
`;

const GameRecordDetail = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;
export default GameRecord;
