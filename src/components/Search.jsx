import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Search(props) {
  const [search, setSearch] = useState("");
  function searchChangeHandler(e) {
    setSearch(e.target.value);
  }
  const navigate = useNavigate();
  function findSubmit() {
    navigate(`/find/${search}`);
  }
  function searchKeyDownHandler(e) {
    if (e.key === "Enter") {
      findSubmit();
    }
  }
  return (
    <SearchContent>
      <SearchSelect name="" id="">
        <option value="">KR</option>
      </SearchSelect>
      <SearchInput
        type="text"
        placeholder={props.placeholder}
        onChange={searchChangeHandler}
        onKeyDown={searchKeyDownHandler}
        value={search}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ width: "80px", fontSize: "20px", cursor: "pointer" }}
        onClick={findSubmit}
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
  box-sizing: border-box;
  padding-top: 2px;
  padding-left: 5px;
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
