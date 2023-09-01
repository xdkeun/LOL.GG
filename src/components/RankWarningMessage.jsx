//랭크 강등 임박, 승급 임박 메시지 컴포넌트
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function RankWarningMessage({ status }) {
  return (
    <RankWarningMessageContent>
      <FontAwesomeIcon icon={faCircleExclamation} />
      {status}
    </RankWarningMessageContent>
  );
}
const RankWarningMessageContent = styled.button`
  margin: 0 5px;
  display:flex;
  align-items:center;
  gap:5px;
  padding: 5px;
  background-color:red;
  color:white;
  border-radius:5px;
`;

export default RankWarningMessage;
