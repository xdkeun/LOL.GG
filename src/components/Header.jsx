import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
function Header() {
  const theme = useTheme();
  return (
    <HeaderContent theme={theme}>
      <div
        style={{
          border: "1px solid white",
          borderRadius: "10px",
          padding: "5px",
          boxSizing: "border-box",
        }}
      >
        <Link to="/">LOGO</Link>
      </div>
      <div>
        <Link to="/champions">챔피언</Link>
      </div>
      <div>
        <Link to="/ranking">랭킹</Link>
      </div>
      <div>
        <Link to="/friends">친구</Link>
      </div>
      <div>
        <Link to="/rotation">로테이션</Link>
      </div>
      <div>
        <Link to="/board">게시판</Link>
      </div>
    </HeaderContent>
  );
}
const HeaderContent = styled.header`
  height: 50px;
  font-size: 18px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.font};
`;
export default Header;
