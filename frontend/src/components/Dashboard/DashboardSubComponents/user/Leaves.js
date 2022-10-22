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

const Leaves = () => {
  const doc = new jsPDF("p", "pt", "a2");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [newdata, setNewdata] = useState("");

  useEffect(() => {}, [query]);

  useEffect(() => {
    (async () => {
      await axios
        .get("/ministry/leaves")
        .then((res) => {
          setData(res.data);
          setLoader(true);
        })
        .catch(() => null);
    })();
  }, []);

  let filteredData = data.filter(
    (el) => el?.empId === localStorage.getItem("id")
  );

  const showModal = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteHandler = async (id) => {
    //method for forgot password handling
    try {
      await axios.delete(`/ministry/leaves/delete/${id}`);
      setTimeout(() => {
        setVisible(false);
        notification.info({
          message: `Notification`,
          description: "Successfully deleted the leave 😘",
          placement: "top",
        });
      }, 3000);
      await axios
        .get("/ministry/leaves")
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => alert(error));
      filteredData = data.filter((el) => el._id !== id);
    } catch (error) {
      alert(error.response.data.error);
      //   setTimeout(() => {}, 5000); //5s
    }
  };

  console.log("query", query);
  const print = () => {
    autoTable(doc, {
      head: [
        [
          "Leave Type",
          "Reason",
          "Leave Start Date",
          "NIC",
          "No of Days",
          "Name",
          "Status",
        ],
      ],
      theme: "grid",
      body: data.map((val) => [
        val?.type,
        val?.reason,
        moment(val?.date).format("DD MMM, YYYY"),
        val?.nic,
        val?.duration,
        val?.nameWithInitials,
        val?.status,
      ]),
    });

    doc.save(`leaveHistory_${new Date()}.pdf`);
  };

  return (
    <>
      <input placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
      <Button style={{ float: "right" }} onClick={print}>
        Generate Report
      </Button>
      <br /> <br />
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          {[...filteredData].filter(
            (value) =>
              value.type.toLowerCase().indexOf(query.toLowerCase()) >= 0
          ).length === 0 ? (
            <>
              <center>
                <span style={{ fontSize: "30px" }}>
                  <InboxOutlined width={100} />
                  <br />
                  No Leaves
                </span>
              </center>
            </>
          ) : (
            [...filteredData]
              .filter(
                (value) =>
                  value.type.toLowerCase().indexOf(query.toLowerCase()) >= 0
              )
              .map((value) => {
                return (
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "40px",
                      marginBottom: "10px",
                    }}
                  >
                    <Card
                      title={value?.type}
                      //extra={<a href="#">More</a>}
                      style={{ width: 300 }}
                    >
                      <span>Reason : {value?.reason}</span>
                      <br />
                      <span>
                        Leave Start Date :{" "}
                        {moment(value?.date).format("DD/MM/YYYY")}
                      </span>
                      <br />
                      <span>No of Days : {value?.duration} Day/s</span>
                      <br />
                      <span>
                        Substitute Person's NIC :{" "}
                        {value?.nic.length === 9
                          ? value?.nic + "V"
                          : value?.nic}
                      </span>
                      <br />
                      <span>Substitute Person : {value?.name}</span>
                      <br />
                      <br />
                      <div>
                        <span>
                          Status :{" "}
                          {value?.status === "pending" ? (
                            <span style={{ color: "orange" }}>
                              {value?.status.toUpperCase()}
                            </span>
                          ) : value?.status === "accepted" ? (
                            <span style={{ color: "green" }}>
                              {value?.status.toUpperCase()}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              {value?.status.toUpperCase()}
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            float: "right",
                            color: "red",
                            fontSize: "15px",
                          }}
                        >
                          {" "}
                          <DeleteOutlined onClick={showModal} />
                        </span>
                      </div>
                      <Modal
                        visible={visible}
                        title="Are you sure to delete ?"
                        onCancel={handleCancel}
                        footer={false}
                      >
                        <center>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => deleteHandler(value?._id)}
                          >
                            Delete
                          </Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </center>
                      </Modal>
                    </Card>
                  </div>
                );
              })
          )}
        </>
      )}
    </>
  );
};

export default Leaves;
