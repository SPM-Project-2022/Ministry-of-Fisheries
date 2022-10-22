import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetColumnSearchProps } from "./common/Search";

const UnOfficialEmps = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [nic, setNIC] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);
  const [index, setIndex] = useState(0);
  const [deleteVidsible, setDeleteVidsible] = useState(false);

  useEffect(() => {
    (async () =>
      axios.get("/unOfficialEmployee").then((res) => {
        setData(res?.data);
        setLoading(false);
        setVisible(false);
        setNIC(null);
        setPhone(null);
        setName(null);
        setSuccess(false);
      }))();
  }, [success]);

  const disablePermission = () => {
    return !nic || !name || !phone;
  };

  const handleSubmit = async (type) => {
    try {
      type === "ADD"
        ? await axios
            .post("/unOfficialEmployee/create", {
              id: parseInt([...data]?.pop()?.empId) + 1,
              nic,
              name,
              phoneNumber: phone,
            })
            .then(() => {
              setVisible(false);
              form.resetFields();
              setNIC(null);
              setPhone(null);
              setName(null);
              setStatus("");
              setIsChanged(false);
            })
        : await axios
            .put(`/unOfficialEmployee/${id}`, {
              nic,
              name,
              phoneNumber: phone,
            })
            .then(() => {
              setVisible(false);
              form.resetFields();
              setNIC(null);
              setPhone(null);
              setName(null);
              setStatus("");
              setIsChanged(false);
            });
      notification.success({
        message: "Notification",
        description: `The role ${nic} is successfully ${
          type === "ADD" ? "added." : "updated."
        }.`,
        placement: "topRight",
      });
      setSuccess(true);
    } catch (error) {
      notification.error({
        message: "Something went wrong",
        description: error,
        placement: "topRight",
      });
    }
  };

  const columns = [
    { title: "Employee ID", dataIndex: "empId" },
    { title: "Full Name", dataIndex: "name", ...GetColumnSearchProps("name") },
    { title: "NIC", dataIndex: "nic" },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    {
      title: "",
      render: (_, record, index) => (
        <div>
          <DeleteOutlined
            className="icon-delete"
            onClick={() => {
              setDeleteVidsible(true);
              setId(record?._id);
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined
            className="icon-edit"
            onClick={() => {
              setVisible(true);
              setNIC(record?.nic);
              setPhone(record?.phoneNumber);
              setName(record?.name);
              setStatus("edit");
              setId(record?._id);
              setIndex(index);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        size={data?.length}
        scroll={{ x: "max-content" }}
      />
      <div>
        <Button className="btn-role" onClick={() => setVisible(true)}>
          +ADD EMPLOYEE
        </Button>
      </div>
      <Modal
        title={status === "edit" ? "UPDATE ROLE" : "ADD ROLE"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setNIC(null);
          setPhone(null);
          setName(null);
          setStatus("");
          setIsChanged(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <Form
            form={form}
            onFinish={() => handleSubmit(status === "edit" ? "UPDATE" : "ADD")}
          >
            <Form.Item name={"nic"} label={"NIC"}>
              <Input
                placeholder="Enter NIC"
                onChange={(e) => {
                  setNIC(e.target.value);
                  setIsChanged(true);
                }}
                defaultValue={status === "edit" ? data[index].nic : null}
              />
            </Form.Item>
            <Form.Item name={"name"} label={"Full Name"}>
              <Input
                placeholder="Enter Full Name"
                maxLength={30}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsChanged(true);
                }}
                defaultValue={status === "edit" ? data[index].name : null}
                showCount
              />
            </Form.Item>
            <Form.Item name={"phoneNumber"} label={"Full Phone Number"}>
              <Input
                placeholder="Enter Phone Number"
                maxLength={30}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setIsChanged(true);
                }}
                defaultValue={
                  status === "edit" ? data[index].phoneNumber : null
                }
                showCount
              />
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type={"primary"}
                  disabled={disablePermission() || !isChanged}
                  onClick={() =>
                    form.validateFields().then(() => form.submit())
                  }
                >
                  {status === "edit" ? "UPDATE" : "ADD"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title={"DELETE"}
        visible={deleteVidsible}
        onCancel={() => {
          setDeleteVidsible(false);
          setId(null);
        }}
        footer={null}
      >
        <center>
          {" "}
          Are you sure to delete? <br />
          <br />
          <br />
          <Button
            style={{ color: "white", backgroundColor: "red" }}
            onClick={async () => {
              await axios.delete(`/unOfficialEmployee/${id}`).then(() => {
                setSuccess(true);
                notification.success({
                  message: "Notification",
                  description: `Successfully deleted.`,
                  placement: "topRight",
                });
              });
              setDeleteVidsible(false);
            }}
          >
            DELETE
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={() => {
              setId(null);
              setDeleteVidsible(false);
            }}
          >
            CANCEL
          </Button>
        </center>
      </Modal>
    </div>
  );
};

export default UnOfficialEmps;
