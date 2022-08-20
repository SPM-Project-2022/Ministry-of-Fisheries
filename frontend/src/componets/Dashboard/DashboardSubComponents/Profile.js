import React, { useState, useEffect } from "react";
import { Card, Avatar, Progress } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";

const { Meta } = Card;

const Profile = () => {
  const [nic, setNIC] = useState("");
  const [empId, setEmpId] = useState("");
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [branch, setBranch] = useState("");
  const [_id, set_id] = useState("");

  const history = useNavigate();

  useEffect(() => {
    (async () => {
      await axios
        .get(`/api/auth/get/${localStorage.getItem("id")}`)
        .then((res) => {
          setEmpId(res.data.empId);
          setNIC(res.data.nic);
          setNameWithInitials(res.data.nameWithInitials);
          setFullName(res.data.fullName);
          setAddress(res.data.address);
          setPhoneNumber(res.data.phoneNumber);
          setEmail(res.data.email);
          setDesignation(res.data.designation);
          setBranch(res.data.branch);
          set_id(res.data._id);
        })
        .catch(() => null);
    })();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("/ministry/leaves")
        .then((res) => {
          setData(res.data);
        })
        .catch(() => null);
    })();
  }, []);

  const casualCount = data.filter(
    (el) =>
      el.type === "Casual Leave" && el.empId === localStorage.getItem("id")
  );
  const dutyCount = data.filter(
    (el) => el.type === "Duty Leave" && el.empId === localStorage.getItem("id")
  );
  const medicalCount = data.filter(
    (el) =>
      el.type === "Medical Leave" && el.empId === localStorage.getItem("id")
  );

  const annualCount = data.filter(
    (el) =>
      el.type === "Annual Leave" && el.empId === localStorage.getItem("id")
  );

  const mapedLeave = (
    <div>
      <br />
      <Progress
        percent={casualCount.length}
        status="active"
        strokeWidth={12}
        type="circle"
        format={(percent) => `${percent}% Casual Leaves`}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      />
      <br />
      <br />
      <Progress
        percent={dutyCount.length}
        status="active"
        strokeWidth={12}
        type="circle"
        format={(percent) => `${percent}% Duty Leaves`}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      />
      <br />
      <br />
      <Progress
        percent={medicalCount.length}
        status="active"
        strokeWidth={12}
        type="circle"
        format={(percent) => `${percent}% Medical Leaves`}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      />
      <Progress
        percent={annualCount.length}
        status="active"
        strokeWidth={12}
        type="circle"
        format={(percent) => `${percent}% Annual Leaves`}
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      />
      <br />
    </div>
  );

  const mapedData = (
    <div>
      <table>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Employee Id :</span> {empId}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Name With Initials:</span>{" "}
            {nameWithInitials}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Full Name :</span> {fullName}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 NIC :</span>{" "}
            {nic.length === 9 ? nic + "V" : nic}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Address :</span> {address}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Phone Number :</span>{" "}
            {phoneNumber}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Email :</span> {email}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Designation :</span>{" "}
            {designation}
          </td>
        </tr>
        <tr>
          <td>
            <span style={{ color: "black" }}>🟩 Branch :</span> {branch}
          </td>
        </tr>
      </table>
    </div>
  );

  return (
    <center>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Card
          style={{ width: 300 }}
          // cover={
          //   <img
          //     alt="example"
          //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          //   />
          // }
          actions={[
            <EditOutlined
              key="edit"
              onClick={() =>
                history(
                  `/user-dashboard/${localStorage.getItem(
                    "username"
                  )}?_userEdit=true&_id=${empId}`
                )
              }
            />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Your Details"
            description={mapedData}
          />
        </Card>
        <Card style={{ width: 300, height: 500 }}>
          <Meta title="Leave Status" description={mapedLeave} />
        </Card>
      </div>
    </center>
  );
};

export default Profile;
