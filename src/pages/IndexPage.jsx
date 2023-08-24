import Header from "../components/Header";
import Loading from "../components/Loading";
import Search from "../components/Search";
import styled from "styled-components";
function IndexPage() {
  return (
    <div>
      <Header />
      <IndexSearch>
        <Search placeholder="소환사명을 입력해주세요" />
      </IndexSearch>
    </div>
  );
}
const IndexSearch = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;
export default IndexPage;
