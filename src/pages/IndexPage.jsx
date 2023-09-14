import Friends from "../components/Friends";
import Header from "../components/Header";
import Ranking from "../components/Ranking";
import Rotation from "../components/Rotation";
import Search from "../components/Search";
import styled from "styled-components";
function IndexPage() {
  const fixPage = localStorage.getItem("fixPage");
  return (
    <div>
      <Header />
      <IndexSearch>
        <Search placeholder="소환사명을 입력해주세요" />
      </IndexSearch>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {fixPage === "Ranking" ? <Ranking /> : null}
      </div>
    </div>
  );
}
const IndexSearch = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;
export default IndexPage;
