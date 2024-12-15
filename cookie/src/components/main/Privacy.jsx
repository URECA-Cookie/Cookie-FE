import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PrivacyContainer = styled.div`
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

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <PrivacyContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </BackButton>

      <Title>개인정보처리방침</Title>

      <Section>
        <h2>제1조 (개인정보의 수집 및 이용 목적)</h2>
        <p>
          회사는 서비스 제공을 위하여 필요한 최소한의 개인정보만을 수집하며,
          수집된 개인정보는 서비스 제공과 관련된 목적으로만 이용됩니다.
        </p>
      </Section>

      <Section>
        <h2>제2조 (수집하는 개인정보 항목)</h2>
        <p>1. 필수 항목: 이름, 이메일, 전화번호, 주소</p>
        <p>2. 선택 항목: 서비스 이용기록, 쿠키, 결제정보</p>
      </Section>

      <Section>
        <h2>제3조 (개인정보의 보유 및 이용 기간)</h2>
        <p>
          회사는 수집된 개인정보를 이용자가 동의한 기간 동안 보유하며, 목적이
          달성된 후에는 관련 법령에 따라 즉시 파기합니다.
        </p>
      </Section>

      <Section>
        <h2>제4조 (개인정보의 제3자 제공)</h2>
        <p>
          회사는 법령에 따라 허용되는 경우를 제외하고, 이용자의 개인정보를
          제3자에게 제공하지 않습니다.
        </p>
      </Section>

      <Section>
        <h2>제5조 (개인정보 처리 위탁)</h2>
        <p>
          회사는 서비스 제공을 위해 개인정보 처리를 외부에 위탁할 수 있으며,
          위탁 업체의 관리·감독을 철저히 이행합니다.
        </p>
      </Section>

      <Section>
        <h2>제6조 (이용자의 권리)</h2>
        <p>
          이용자는 자신의 개인정보에 대한 열람, 수정, 삭제를 요청할 수 있으며,
          회사는 관련 법령에 따라 신속히 조치합니다.
        </p>
      </Section>

      <Section>
        <h2>제7조 (개인정보의 보호 대책)</h2>
        <p>
          회사는 개인정보 보호를 위해 관리적·기술적 보호 조치를 시행하며, 보안
          사고 예방을 위해 최선을 다합니다.
        </p>
      </Section>

      <Section>
        <h2>제8조 (개정 및 공지)</h2>
        <p>
          본 개인정보처리방침은 관련 법령 및 회사 정책에 따라 변경될 수 있으며,
          주요 변경 사항은 사전에 공지합니다.
        </p>
      </Section>
    </PrivacyContainer>
  );
};

export default Privacy;
