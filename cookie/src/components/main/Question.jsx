import { useState } from "react";
import styled from "styled-components";

const Question = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question: "쿠키리즘이 뭔가요?",
      answer:
        "쿠키리즘은 사용자 맞춤형 콘텐츠 추천 시스템입니다. 사용자의 서비스 활동을 기반으로 매일매일 새로운 맞춤형 영화를 추천받을 수 있어요!",
    },
    {
      question: "쿠키 추천 영화는 어떻게 선정되나요?",
      answer:
        "쿠키 자체 추천 시스템으로 전체 사용자의 선호 영화 데이터를 바탕으로 선정돼요!",
    },
    {
      question: "회원가입 시 선택한 장르는 어떻게 사용되나요?",
      answer:
        "맞춤형 영화 제공 데이터가 없을때, 회원가입 시 선택한 장르의 영화를 보여드려요. 해당 장르의 영화에 리뷰가 달리면 푸쉬알림으로 소식을 받아보실 수 있어요.",
    },
    {
      question: "포인트는 어떻게 모을 수 있나요?",
      answer:
        "매치업, 리뷰 작성 등을 통해 포인트를 획득할 수 있어요! 포인트를 많이 모으면 뱃지가 업그레이드 된답니다.",
    },
    {
      question: "매치업 참여 방식을 알려주세요?",
      answer:
        "월 ~ 일요일 자정까지 한 회차마다 2개의 매치업이 진행됩니다. 하나의 영화에 투표하고, 채팅으로 이야기를 나누어 보세요! 우승작에 투표한 모든 사용자들에게 포인트를 드려요.",
    },
  ];

  return (
    <QuestionContainer>
      <Title>자주 묻는 질문</Title>
      <QuestionSection>
        {questions.map((item, index) => (
          <div key={index}>
            <QuestionButton onClick={() => toggleQuestion(index)}>
              {item.question}
              <ToggleIcon>{openIndex === index ? "-" : "＋"}</ToggleIcon>
            </QuestionButton>
            {openIndex === index && <AnswerBox>{item.answer}</AnswerBox>}
          </div>
        ))}
      </QuestionSection>
    </QuestionContainer>
  );
};

export default Question;

const QuestionContainer = styled.div`
  padding-bottom: 3rem;
`;
const Title = styled.h2`
  color: #f84b99;
  padding: 2rem 0 0 0.375rem;
`;

const QuestionSection = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  gap: 0.5rem;
`;

const QuestionButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: #1b1b1b;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: 0.2px solid #3c3c3c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 0 1rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #2d2c2c;
  }
`;

const ToggleIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const AnswerBox = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 400;
  border-radius: 10px;
  margin-top: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
