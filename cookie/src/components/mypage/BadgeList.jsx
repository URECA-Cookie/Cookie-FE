import styled from "styled-components";
import PropTypes from "prop-types";

const BadgeSection = styled.div`
  text-align: center;
  margin-top: 100px;
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-radius: 16px;
`;

const BadgeTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  overflow-x: auto;
  padding: 20px 10px;
  flex-wrap: wrap;
  height: 150px;
  overflow-y: scroll;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const BadgeImage = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const BadgeLabel = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const BadgeList = ({ badges }) => {
  return (
    <BadgeSection>
      <BadgeContainer>
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <BadgeItem key={index}>
              <BadgeImage
                src={badge.badgeImage || "https://ibb.co/QrbJCj0"}
                alt={`${badge.name || "Badge"} Badge`}
              />
              <BadgeLabel>{badge.name || "이름 없음"}</BadgeLabel>
            </BadgeItem>
          ))
        ) : (
          <p>표시할 배지가 없습니다.</p>
        )}
      </BadgeContainer>
    </BadgeSection>
  );
};

BadgeList.propTypes = {
  title: PropTypes.string.isRequired,
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      badgeImage: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

BadgeList.defaultProps = {
  title: "배지 리스트",
  badges: [],
};

export default BadgeList;
