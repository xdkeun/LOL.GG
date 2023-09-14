import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
//사용자가 가장 자주 사용하는 페이지를 Index 페이지에 고정(랭킹, 로테이션, 친구 등 사용자가 원하는 컴포넌트를 메인 페이지에 고정시킬 수 있음)
function FixToIndex({ page }) {
  const [fixPage, setFixPage] = useState(localStorage.getItem("fixPage") || ""); // 초기값 설정

  useEffect(() => {
    localStorage.setItem("fixPage", fixPage); // fixPage 값이 변경될 때마다 localStorage에 저장
  }, [fixPage]);

  function fixToIndexClickHandler() {
    setFixPage(page);
  }

  return (
    <FixToIndexContent onClick={fixToIndexClickHandler}>
      <FixToIndexButton>
        <FontAwesomeIcon icon={faStar} />
        <FixToIndexText>메인페이지에고정</FixToIndexText>
      </FixToIndexButton>
    </FixToIndexContent>
  );
}

const FixToIndexContent = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FixToIndexButton = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  background-color: #318eef;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const FixToIndexText = styled.p``;

export default FixToIndex;
