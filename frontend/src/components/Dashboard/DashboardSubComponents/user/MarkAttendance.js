import React, { useEffect, useState } from "react";
import { Card, Spin, notification, Modal, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { GetColumnSearchProps } from "../../DashboardSubComponents/common/Search";
import "antd/dist/antd.css";

const MarkAttendance = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, [3000]);
  }, []);

  const markAttendance = async (id) => {
    //method for forgot password handling
    try {
      await axios.post(
        `/markattendance`,
        { email: localStorage.getItem("email") },
        { date: new Date() }
      );
      setTimeout(() => {
        notification.info({
          message: `Notification`,
          description: "Successfully Marked the attendance 😘",
          placement: "top",
        });
      }, 3000);
    } catch (error) {
      alert(error.response.data.error);
      //   setTimeout(() => {}, 5000); //5s
    }
  };

  const history = useNavigate();

  return (
    <>
      {!loader ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <center>
            <button type="secondary" onClick={() => markAttendance()}>
              Mark Attendance
            </button>
          </center>
        </>
      )}
    </>
  );
};

export default MarkAttendance;
