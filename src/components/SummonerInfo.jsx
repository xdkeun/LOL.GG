//사용자 검색 시 사용자의 아이콘, 레벨, 닉네임, 친구 등록 컴포넌트
import styled from "styled-components";
import RankWarningMessage from "./RankWarningMessage";
import { useState } from "react";
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
function SummonerInfo({ name, level, icon, soloRankPoint, freeRankPoint, id }) {
  //selectedIcon이 없을 경우 29.png(default image)가 표시되도록 구현
  const selectedIcon = iconImages[`${icon}.png`] || iconImages["29.png"];
  // 친구 등록 버튼을 클릭 시 friends 라는 localStorage에 값이 들어가도록 함.
  // 로컬 스토리지에서 friends 데이터 가져오기
  const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
  const [friendIds, setFriendIds] = useState(storedFriends);

  function addFriend() {
    const newFriendId = id;

  // 중복 체크: 이미 있는 친구인지 확인
  if (!friendIds.includes(newFriendId)) {
    const updatedFriendIds = [...friendIds, newFriendId]; // 업데이트된 friends 배열 생성

    // friends 배열을 로컬 스토리지에 저장 (문자열로 변환)
    localStorage.setItem("friendIds", JSON.stringify(updatedFriendIds));

    // 상태 업데이트
    setFriendIds(updatedFriendIds);
  } else {
    // 이미 친구로 추가된 경우 처리
    alert("이미 친구로 추가된 사용자입니다.");
  }
  }

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
            onClick={addFriend}
          >
            친구 등록하기
          </button>
          {soloRankPoint >= 75 && soloRankPoint < 100 ? (
            <RankWarningMessage status="솔로랭크 승급 임박" />
          ) : soloRankPoint === 0 ? (
            <RankWarningMessage status="솔로랭크 강등 임박" />
          ) : null}

          {freeRankPoint >= 75 && freeRankPoint < 100 ? (
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