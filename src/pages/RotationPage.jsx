import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Rotation from "../components/Rotation";
import FixToIndex from "../components/FixToIndex";

function RotationPage() {
  //일반 사용자(11레벨 이상) 로테이션
  const [rotationChampionIds, setRotationChampionIds] = useState([]);
  //초보자 로테이션
  const [
    rotationChampionIdsForNewPlayers,
    setRotationChampionIdsForNewPlayers,
  ] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-8ba4fa47-ee37-4772-bfa1-c25c85bb184a`
      )
      .then(function (response) {
        setRotationChampionIds(response.data.freeChampionIds);
        setRotationChampionIdsForNewPlayers(
          response.data.freeChampionIdsForNewPlayers
        );
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <FixToIndex/>
        <Rotation
          rotationChampionIds={rotationChampionIds}
          rotationChampionIdsForNewPlayers={rotationChampionIdsForNewPlayers}
        />
      </div>
    </div>
  );
}
export default RotationPage;
