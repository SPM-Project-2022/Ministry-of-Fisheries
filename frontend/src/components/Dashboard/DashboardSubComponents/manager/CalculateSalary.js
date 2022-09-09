import React from "react";
import { Tabs } from "antd";
import { QuestionCircleFilled, ToolFilled } from "@ant-design/icons";
import "../../styles/TabContainer.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import PaymentHistory from "./PaymentHistory";
const { TabPane } = Tabs;

const CalculateSalary = () => {
  const history = useNavigate();
  const location = useLocation();

  const handleTabClick = (key) =>
    history(`${location.pathname}?_calcSal=1&tab=${key}`);
  return (
    <div className="card-container">
      <Tabs type="card" onChange={handleTabClick}>
        <TabPane
          tab={
            <>
              <ToolFilled /> Actions
            </>
          }
          key="actions"
        >
          <Actions />
        </TabPane>
        <TabPane
          tab={
            <>
              <QuestionCircleFilled /> Payment History
            </>
          }
          key="history"
        >
          <PaymentHistory />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CalculateSalary;
