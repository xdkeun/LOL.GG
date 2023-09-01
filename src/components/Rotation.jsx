import React from "react";
import champions from "../apis/champions";
import Loading from "./Loading";
import styled from "styled-components";
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

function Rotation({ rotationChampionIds, rotationChampionIdsForNewPlayers }) {
  return (
    <div>
      <RotationTitle>금주의 로테이션 챔피언</RotationTitle>
      <RotationSection>
        {rotationChampionIds ? (
          rotationChampionIds.map((rotationChampionId) => (
            <RotationArticle key={rotationChampionId}>
              <RotationChampImg
                key={rotationChampionId}
                src={championImages[`${champions[rotationChampionId]}.png`]}
                alt={champions[rotationChampionId]}
              />
              <RotationChampName>
                {champions[rotationChampionId]}
              </RotationChampName>
            </RotationArticle>
          ))
        ) : (
          <Loading />
        )}
      </RotationSection>

      <RotationTitle>초보자 로테이션 챔피언</RotationTitle>
      <RotationSection>
        {rotationChampionIdsForNewPlayers ? (
          rotationChampionIdsForNewPlayers.map(
            (rotationChampionIdForNewPlayers) => (
              <RotationArticle key={rotationChampionIdForNewPlayers}>
                <RotationChampImg
                  key={rotationChampionIdForNewPlayers}
                  src={
                    championImages[
                      `${champions[rotationChampionIdForNewPlayers]}.png`
                    ]
                  }
                  alt={champions[rotationChampionIdForNewPlayers]}
                />
                <RotationChampName>
                  {champions[rotationChampionIdForNewPlayers]}
                </RotationChampName>
              </RotationArticle>
            )
          )
        ) : (
          <Loading />
        )}
      </RotationSection>
    </div>
  );
}

const RotationTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  background-color: #318eef;
  color: white;
  padding: 10px;
  display: inline-block;
  box-sizing: border-box;
`;

const RotationSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
`;

const RotationArticle = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RotationChampImg = styled.img`
  width: 66px;
  height: 66px;
`;

const RotationChampName = styled.p``;

export default Rotation;
