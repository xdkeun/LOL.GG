//사용자 검색 시 사용자의 아이콘, 레벨, 닉네임, 친구 등록 컴포넌트
import styled from "styled-components";
import RankWarningMessage from "./RankWarningMessage";
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const iconImages = importAll(
  require.context("../assets/summonerIcons", false, /\.(png|jpe?g|svg)$/)
);
function SummonerInfo({ name, level, icon, soloRankPoint, freeRankPoint }) {
  //selectedIcon이 없을 경우 29.png(default image)가 표시되도록 구현
  const selectedIcon = iconImages[`${icon}.png`] || iconImages["29.png"];
  return (
    <SummonerInfoContent>
      <div style={{ position: "relative" }}>
        <SummonerIconImg src={selectedIcon} alt="소환사 아이콘" />
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>{name}</span>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            친구 등록하기
          </button>
          {soloRankPoint >= 75 ? (
            <RankWarningMessage status="솔로랭크 승급 임박" />
          ) : soloRankPoint === 0 ? (
            <RankWarningMessage status="솔로랭크 강등 임박" />
          ) : null}

          {freeRankPoint >= 75 ? (
            <RankWarningMessage status="자유랭크 승급 임박" />
          ) : freeRankPoint === 0 ? (
            <RankWarningMessage status="자유랭크 강등 임박" />
          ) : null}
        </div>
        <button
          style={{
            backgroundColor: "#318eef",
            color: "white",
            padding: "10px 0",
            width: "150px",
          }}
        >
          인게임 정보
        </button>
      </div>
    </SummonerInfoContent>
  );
}

const SummonerInfoContent = styled.header`
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

export default SummonerInfo;
