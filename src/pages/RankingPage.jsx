import Header from "../components/Header";
import FixToIndex from "../components/FixToIndex";
import Ranking from "../components/Ranking";
import Search from "../components/Search";

function RankingPage() {
  return (
    <div>
      <Header />
      <div style={{ margin: "20px" }}>
        <Search />
        <div style={{ margin: "10px 0" }}>
          <FixToIndex />
        </div>
        <Ranking />
      </div>
    </div>
  );
}

export default RankingPage;
