import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TermsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
  color: #333;
  font-size: 1rem;
  line-height: 1.8;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #f84b99;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ff0777;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #f84b99;
  margin-bottom: 20px;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 30px;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

const Terms = () => {
  const navigate = useNavigate();

  return (
    <TermsContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </BackButton>

      <Title>이용약관</Title>

      <Section>
        <h2>제1조 (목적)</h2>
        <p>
          본 약관은 쿠키(이하 "회사")가 제공하는 서비스의 이용과 관련하여 회사와
          이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
        </p>
      </Section>

      <Section>
        <h2>제2조 (정의)</h2>
        <p>1. "서비스"란 회사가 운영하는 웹사이트와 모바일 앱을 의미합니다.</p>
        <p>2. "이용자"란 회사의 서비스를 이용하는 모든 고객을 의미합니다.</p>
      </Section>

      <Section>
        <h2>제3조 (이용계약의 성립)</h2>
        <p>
          1. 이용계약은 이용자가 회사의 약관에 동의하고 서비스 이용 신청을
          함으로써 성립됩니다.
        </p>
        <p>2. 회사는 서비스 이용 신청에 대해 승인 여부를 결정할 수 있습니다.</p>
      </Section>

      <Section>
        <h2>제4조 (서비스 제공 및 변경)</h2>
        <p>
          회사는 서비스 제공을 위하여 필요한 경우 서비스의 내용을 변경할 수
          있으며, 주요 변경 사항은 사전에 공지합니다.
        </p>
      </Section>

      <Section>
        <h2>제5조 (서비스 이용의 제한)</h2>
        <p>
          이용자가 본 약관에 위배되는 행위를 할 경우 회사는 서비스 이용을
          제한하거나 이용 계약을 해지할 수 있습니다.
        </p>
      </Section>

      <Section>
        <h2>제6조 (개인정보 보호)</h2>
        <p>
          회사는 이용자의 개인정보를 보호하며, 개인정보 처리방침에 따라 적절히
          관리합니다.
        </p>
      </Section>

      <Section>
        <h2>제7조 (면책조항)</h2>
        <p>
          회사는 천재지변, 전쟁, 통신 장애 등 불가항력으로 인한 서비스 제공
          중단에 대해 책임을 지지 않습니다.
        </p>
      </Section>

      <Section>
        <h2>제8조 (기타)</h2>
        <p>본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.</p>
      </Section>
    </TermsContainer>
  );
};

export default Terms;
