import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Search(props) {
  return (
    <SearchContent>
      <SearchSelect name="" id="">
        <option value="">KR</option>
      </SearchSelect>
      <SearchInput type="text" placeholder={props.placeholder} />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ width: "80px", fontSize: "20px", cursor: "pointer" }}
      />
    </SearchContent>
  );
}
const SearchContent = styled.div`
  width: 560px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
`;
const SearchSelect = styled.select`
  width: 80px;
  height: 70%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
`;
const SearchInput = styled.input`
  all: unset;
  width: 400px;
`;

export default Search;
