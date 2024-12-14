import React, { useState } from "react";
import SideBar from "../../components/admin/SideBar";
import { TabBtn, TabBtnContainer, Viewport } from "./AdminMovie";
import review from "../../assets/images/admin/review.svg";
import heart from "../../assets/images/admin/heart.svg";
import Reviews from "../../components/admin/Reviews";
import Likes from "../../components/admin/Likes";

function AdminReviewLike() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <SideBar />
      <Viewport>
        <TabBtnContainer>
          <TabBtn onClick={() => setActiveTab(1)} $isActive={activeTab === 1}>
            <img src={review} />
            리뷰관리
          </TabBtn>
          <TabBtn onClick={() => setActiveTab(2)} $isActive={activeTab === 2}>
            <img src={heart} />
            좋아요관리
          </TabBtn>
        </TabBtnContainer>
        {activeTab === 1 && <Reviews />}
        {activeTab === 2 && <Likes />}
      </Viewport>
    </>
  );
}

export default AdminReviewLike;
