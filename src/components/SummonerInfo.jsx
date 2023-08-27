import styled from "styled-components";
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const iconImages = importAll(
  require.context("../assets/summonerIcons", false, /\.(png|jpe?g|svg)$/)
);
function SummonerInfo({ name, level, icon }) {
  const selectedIcon = iconImages[`${icon}.png`];
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
        <div>
          <span style={{ fontSize: "20px", marginRight: "10px" }}>{name}</span>
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
