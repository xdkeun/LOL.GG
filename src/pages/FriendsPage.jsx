import FixToIndex from "../components/FixToIndex";
import Friends from "../components/Friends";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

function FriendsPage() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const friendIds = JSON.parse(localStorage.getItem("friendIds")) || [];
  const [friends, setFriends] = useState([]); // 초기값을 빈 배열로 설정
  useEffect(() => {
    // friendIds 배열이 비어있지 않은 경우에만 axios 요청을 보냄
    if (friendIds.length > 0) {
      // 비동기 처리를 위해 Promise.all 사용
      const fetchFriends = async () => {
        try {
          const responses = await Promise.all(
            friendIds.map((friendId) =>
              axios.get(
                `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${friendId}?api_key=${API_KEY}`
              )
            )
          );
          // 응답 데이터를 friends 배열에 추가
          setFriends((prevFriends) => [...prevFriends, ...responses.map((response) => response.data)]);
        } catch (error) {
          console.error(error); // 에러 처리
        }
      };
  
      fetchFriends();
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{margin:"20px"}}>
      <FixToIndex page="Friends"/>
      <Friends friends={friends} setFriends={setFriends}/>
      </div>
    </div>
  );
}

export default FriendsPage;
