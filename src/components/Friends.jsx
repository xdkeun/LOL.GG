import RankWarningMessage from "./RankWarningMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import styled from "styled-components";

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
function Friends({ friends, setFriends }) {
  function friendDeleteHandler(index) {
    alert(index);
  }
  return (
    <div>
      <Title>친구 목록({friends.length}명)</Title>
      <FriendsSection>
        {friends.length === 0 ? (
          <NoFriendWrapper>
            <NoFriend>
              <FontAwesomeIcon icon={faFaceSadTear} />
              <span>친구를 등록하세요 ㅠㅠ</span>
            </NoFriend>
            <Search placeholder="친구 검색하기" />
          </NoFriendWrapper>
        ) : (
          friends.map((friend, index) => (
            <FriendArticle>
              <FriendArticleHeader>
                <FriendImg
                  src={iconImages[`${friend[0].summonerIcon}.png`]}
                  alt=""
                />

                <p style={{ marginBottom: "5px" }}>{friend[0].summonerName}</p>
                {friend[0].leaguePoints >= 75 &&
                friend[0].leaguePoints < 100 ? (
                  <RankWarningMessage status="랭크 승급 임박" />
                ) : friend[0].leaguePoints === 0 ? (
                  <RankWarningMessage status="랭크 강등 임박" />
                ) : null}
              </FriendArticleHeader>
              <p>
                {friend[0].tier} {friend[0].rank} {friend[0].leaguePoints} LP
              </p>
              <p>
                {friend[0].wins}승 {friend[0].losses}패 (
                {(
                  (friend[0].wins / (friend[0].wins + friend[0].losses)) *
                  100
                ).toFixed(2)}
                %)
              </p>
              <FriendDeleteButton
                onClick={() => {
                  friendDeleteHandler(index);
                }}
              >
                친구 삭제하기
              </FriendDeleteButton>
            </FriendArticle>
          ))
        )}
      </FriendsSection>
    </div>
  );
}

const Title = styled.h3`
  margin: 10px 0;
  font-weight: 500;
  font-size: 20px;
`;

const FriendsSection = styled.div`
  display: flex;
  gap: 10px;
`;

const NoFriendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NoFriend = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  color: red;
  font-size: 18px;
`;
const FriendArticle = styled.div`
  width: 260px;
  height: 220px;
  background-color: #e9e9e9;
  border-radius: 10px;
  padding: 10px;
`;

const FriendArticleHeader = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FriendImg = styled.img`
  width: 48px;
  height: 48px;
`;

const FriendDeleteButton = styled.button`
  width: 100%;
  background-color: #318eef;
  color: white;
  padding: 5px 0;
  margin-top: 20px;
`;

export default Friends;
