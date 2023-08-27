import styled from "styled-components";
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const tierImages = importAll(
  require.context("../assets/tiers", false, /\.(png|jpe?g|svg)$/)
);
function SummonerTier({
  soloRankTier,
  soloRank,
  soloRankPoint,
  soloRankWins,
  soloRankLosses,
  freeRankTier,
  freeRank,
  freeRankPoint,
  freeRankWins,
  freeRankLosses,
}) {
  const selectedSoloRankTier = tierImages[`${soloRankTier.toLowerCase()}.png`];
  const selectedFreeRankTier = tierImages[`${freeRankTier.toLowerCase()}.png`];
  return (
    <SummonerTierContent>
      <SummonerTierArticle>
        <RankType>솔로랭크</RankType>
        <RankInfo>
          <TierImg src={selectedSoloRankTier} alt="티어 사진" />
          {soloRankTier === "unranked" ? (
            <p>Unranked</p>
          ) : (
            <>
              <RankTierLP>
                <RankTier>
                  {soloRankTier} {soloRank}
                </RankTier>
                <RankLP>{soloRankPoint} LP</RankLP>
              </RankTierLP>
              <RankWinsLossesInfo>
                <WinsLosses>
                  {soloRankWins}승 {soloRankLosses}패
                </WinsLosses>

                <WinningPercent>
                  승률{" "}
                  {Math.round(
                    (soloRankWins / (soloRankWins + soloRankLosses)) * 100
                  )}
                  %
                </WinningPercent>
              </RankWinsLossesInfo>
            </>
          )}
        </RankInfo>
      </SummonerTierArticle>

      <SummonerTierArticle>
        <RankType>자유랭크</RankType>
        <RankInfo>
          <TierImg src={selectedFreeRankTier} alt="티어 사진" />

          {freeRankTier === "unranked" ? (
            <p>Unranked</p>
          ) : (
            <>
              <RankTierLP>
                <RankTier>
                  {freeRankTier} {freeRank}
                </RankTier>
                <RankLP>{freeRankPoint} LP</RankLP>
              </RankTierLP>
              <RankWinsLossesInfo>
                <WinsLosses>
                  {freeRankWins}승 {freeRankLosses}패
                </WinsLosses>

                <WinningPercent>
                  승률{" "}
                  {Math.round(
                    (freeRankWins / (freeRankWins + freeRankLosses)) * 100
                  )}
                  %
                </WinningPercent>
              </RankWinsLossesInfo>
            </>
          )}
        </RankInfo>
      </SummonerTierArticle>
    </SummonerTierContent>
  );
}
const SummonerTierContent = styled.section`
  display: flex;
  gap: 20px;
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
export default SummonerTier;
