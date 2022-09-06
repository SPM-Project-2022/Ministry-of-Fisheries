import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Card,
  Avatar,
  Spin,
  Button,
  Modal,
  notification,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Meta } = Card;

const DisplayLeaves = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [reject, setReject] = useState(false);

  useEffect(() => {
    (async () => {
      await axios.get("/ministry/leaves").then((res) => {
        setData(
          res.data.filter(
            (el) => el?.status !== "accepted" && el?.status !== "rejected"
          )
        );
        setLoading(true);
      });
    })();
  }, []);

  const markType = async (id, type) => {
    let status = "";
    if (type === "accept") {
      status = "accepted";
    } else {
      status = "rejected";
    }
    await axios
      .put(`/ministry/leaves/update/${id}`, {
        status,
      })
      .then(() => {
        if (type === "accept") {
          notification.info({
            message: `Notification`,
            description: "Accepted 😘",
            placement: "top",
          });
        } else {
          notification.error({
            message: `Notification`,
            description: "Recjted 😢",
            placement: "top",
          });
        }
      });
    await axios
      .get("/ministry/leaves")
      .then((res) => {
        setData(
          res.data.filter(
            (el) => el?.status !== "accepted" && el?.status !== "rejected"
          )
        );
        setVisible(false);
        setReject(false);
      })
      .catch((error) => alert(error));
  };

  const showModal = (type) => {
    if (type === "accept") setVisible(true);
    else setReject(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setReject(false);
  };

  return (
    <>
      {loading === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          <center>
            {data.length === 0 ? (
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
              data.map((value, index) => (
                <div
                  key={value._id}
                  style={{ display: "inline-block", marginRight: "50px" }}
                >
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                      [
                        <div
                          style={{ color: "green" }}
                          onClick={() => showModal("accept")}
                        >
                          <CheckCircleOutlined />
                          <br />
                          <span>Accept</span>
                        </div>,
                      ],
                      [
                        <div
                          style={{ color: "red" }}
                          onClick={() => showModal("reject")}
                        >
                          {" "}
                          <CloseCircleOutlined />
                          <br />
                          <span>Reject</span>
                        </div>,
                      ],
                    ]}
                  >
                    <Skeleton loading={!loading} avatar active>
                      <Meta title={`Leave ${index + 1}`} />
                    </Skeleton>
                    <span>Employee ID : {value?.empId}</span>
                    <br />
                    <span>Name : {value?.nameWithInitials}</span>
                    <br />
                    <span>Leave Type : {value?.type}</span>
                    <br />
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
                      {value?.nic.length === 9 ? value?.nic + "V" : value?.nic}
                    </span>
                    <br />
                    <span>Substitute Person : {value?.name}</span>
                  </Card>
                  <Modal
                    visible={visible ? visible : reject}
                    title={
                      visible
                        ? "Are you sure to accept ?"
                        : "Are you sure to reject ?"
                    }
                    onCancel={handleCancel}
                    footer={false}
                  >
                    <center>
                      {visible ? (
                        <Button
                          type="primary"
                          htmlType="submit"
                          color="green"
                          onClick={() => markType(value._id, "accept")}
                        >
                          Accept
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          htmlType="submit"
                          color="red"
                          onClick={() => markType(value._id, "reject")}
                        >
                          Reject
                        </Button>
                      )}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button htmlType="button" onClick={handleCancel}>
                        Return
                      </Button>
                    </center>
                  </Modal>
                </div>
              ))
            )}
          </center>
        </>
      )}
    </>
  );
};

export default DisplayLeaves;
