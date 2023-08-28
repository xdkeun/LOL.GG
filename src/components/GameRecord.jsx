import styled from "styled-components";
import champion from "../assets/champions/LeeSin.png";
import spell from "../assets/summonerSpells/4.png";
import item from "../assets/items/1018.png";
import rune from "../assets/runes/8000.webp";
import downBlueIcon from "../assets/icon/icon-arrow-down-blue.svg";
import downRedIcon from "../assets/icon/icon-arrow-down-red.svg";
function GameRecord() {
  return (
    <GameRecordContent>
      <GameRecordArticle>
        <GameRecordType>
          <p style={{ fontWeight: "500", color: "black" }}>솔랭</p>
          <p
            style={{
              paddingBottom: "5px",
              borderBottom: "0.5px solid rgba(0,0,0,0.7)",
            }}
          >
            하루 전
          </p>
          <p>패배</p>
          <p>15분 57초</p>
        </GameRecordType>

        <GameRecordInfo>
          <GameRecordInfoTop>
            <GameRecordInfoImgWrapper>
              <GameRecordInfoImg src={champion} alt="챔피언 사진" />
              <GameRecordInfoLevel>18</GameRecordInfoLevel>
            </GameRecordInfoImgWrapper>
            <GameRecordInfoRuneSpellWrapper>
              <GameRecordInfoRuneSpellImg src={spell} alt="" />
              <GameRecordInfoRuneSpellImg src={spell} alt="" />
            </GameRecordInfoRuneSpellWrapper>
            <GameRecordInfoRuneSpellWrapper>
              <GameRecordInfoRuneSpellImg src={rune} alt="" />
              <GameRecordInfoRuneSpellImg src={rune} alt="" />
            </GameRecordInfoRuneSpellWrapper>
            <GameRecordInfoKDAWrapper>
              <GameRecordInfoKDA>9/9/13</GameRecordInfoKDA>
              <GameRecordInfoRatio>평점 2.44</GameRecordInfoRatio>
            </GameRecordInfoKDAWrapper>
            <GameRecordInfoStatsWrapper>
              <KillRate>킬관여 50%</KillRate>
              <InfoStats>제어와드 2</InfoStats>
              <InfoStats>CS 250 (7.8)</InfoStats>
              <InfoStats>Platinum 2</InfoStats>
            </GameRecordInfoStatsWrapper>
          </GameRecordInfoTop>
          <GameRecordInfoBottom>
            <GameRecordInfoItemImg src={item} alt="" />
            <GameRecordInfoItemImg src={item} alt="" />
            <GameRecordInfoItemImg src={item} alt="" />
            <GameRecordInfoItemImg src={item} alt="" />
            <GameRecordInfoItemImg src={item} alt="" />
            <GameRecordInfoItemImg src={item} alt="" />
            <p
              style={{
                backgroundColor: "#e84057",
                color: "white",
                borderRadius: "25px",
                fontSize: "12px",
                padding: "4px 8px",
                margin: "0 4px",
              }}
            >
              트리플킬
            </p>
          </GameRecordInfoBottom>
        </GameRecordInfo>

        <GameRecordParticipants>
          <GameRecordTeams>
            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush111111</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>
          </GameRecordTeams>

          <GameRecordTeams>
            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>

            <TeamInfo>
              <TeamImg src={champion} alt="" />
              <TeamName>Hide on bush</TeamName>
            </TeamInfo>
          </GameRecordTeams>
        </GameRecordParticipants>
        <GameRecordDetail>
          <img src={downRedIcon} alt="" />
        </GameRecordDetail>
      </GameRecordArticle>
      
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
  background-color: #f4a4af; //패배 시
  /* background-color:#86a7ef; //승리 시 */
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
  font-size: 12px;
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

const TeamInfo = styled.div`
  display: flex;
  height: 100%;
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
