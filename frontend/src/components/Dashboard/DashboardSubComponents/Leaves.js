import React, { useEffect, useState } from "react";
import { Card, Spin, notification, Modal, Button } from "antd";
import axios from "axios";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import "antd/dist/antd.css";

const Leaves = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <>
          {filteredData.length === 0 ? (
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
            filteredData.map((value) => {
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
                      Leave Start Date : {moment(value?.date).format("DD/MM/YYYY")}
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
