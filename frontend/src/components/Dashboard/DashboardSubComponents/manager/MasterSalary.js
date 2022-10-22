import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/TabContainer.scss";
import { GetColumnSearchProps } from "../common/Search";

const MasterSalary = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [designation, setDesignation] = useState(null);
  const [salary, setSalary] = useState(null);
  const [status, setStatus] = useState("");
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);
  const [index, setIndex] = useState(0);
  const [deleteVidsible, setDeleteVidsible] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (_, record) => <div>#{record?.id}</div>,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.id > b.id,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.designation.length - b.designation.length,
      ...GetColumnSearchProps("designation"),
    },
    {
      title: "Salary(Rs.)",
      dataIndex: "salary",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.salary > b.salary,
    },
    {
      title: "Status",
      render: (_, record, index) => (
        <div>
          <DeleteOutlined
            className="icon-delete"
            onClick={() => {
              setDeleteVidsible(true);
              setDesignation(record?.designation);
              setId(record?._id);
            }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined
            className="icon-edit"
            onClick={() => {
              setVisible(true);
              setDesignation(record?.designation);
              setSalary(record?.salary);
              setStatus("edit");
              setId(record?._id);
              setIndex(index);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (type) => {
    try {
      type === "ADD"
        ? await axios
            .post("/master-table", {
              id: [...data]?.pop()?.id + 1,
              designation,
              salary,
            })
            .then(() => {
              setDesignation(null);
              form.resetFields();
              setSalary(null);
              setStatus("");
              setIsChanged(false);
            })
        : await axios
            .put(`/master-table/${id}`, {
              designation,
              salary,
            })
            .then(() => {
              setDesignation(null);
              form.resetFields();
              setSalary(null);
              setStatus("");
              setIsChanged(false);
            });
      notification.success({
        message: "Notification",
        description: `The role ${designation} is successfully ${
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

  useEffect(() => {
    (async () =>
      await axios.get("/master-table").then((res) => {
        setData(res?.data);
        setLoading(false);
        setVisible(false);
        setDesignation(null);
        setSalary(null);
        setSuccess(false);
      }))();
  }, [success]);

  const disablePermission = () => {
    return !designation || !salary;
  };

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
        <Button
          className="btn-role"
          onClick={() => {
            setVisible(true);
            setStatus("add");
          }}
        >
          +ADD ROLE
        </Button>
      </div>
      <Modal
        title={status === "edit" ? "UPDATE ROLE" : "ADD ROLE"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          setDesignation(null);
          setSalary(null);
          setStatus("");
          setIsChanged(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          onFinish={() => handleSubmit(status === "edit" ? "UPDATE" : "ADD")}
        >
          <Form.Item name={"designation"} label={"Role Name"}>
            <Input
              placeholder="Enter Role Name"
              onChange={(e) => {
                setDesignation(e.target.value);
                setIsChanged(true);
              }}
              defaultValue={status === "edit" ? data[index]?.designation : null}
            />
          </Form.Item>
          <Form.Item
            name={"salary"}
            label={"Salary(Rs.)"}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!(parseInt(value).toString().length >= 16)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Maximum number limit exceeded.")
                  );
                },
              }),
              {
                pattern: new RegExp(/^[0-9,.]{0,30}$/i),
                message: "Numbers only without spaces",
              },
            ]}
          >
            <Input
              placeholder="Enter Salary"
              maxLength={30}
              onChange={(e) => {
                setSalary(e.target.value);
                setIsChanged(true);
              }}
              defaultValue={status === "edit" ? data[index]?.salary : null}
              showCount
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type={"primary"}
                disabled={disablePermission() || !isChanged}
                onClick={() => form.validateFields().then(() => form.submit())}
              >
                {status === "edit" ? "UPDATE" : "ADD"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={"DELETE"}
        visible={deleteVidsible}
        onCancel={() => {
          setDeleteVidsible(false);
          setDesignation(null);
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
              await axios.delete(`/master-table/${id}`).then(() => {
                setSuccess(true);
                notification.success({
                  message: "Notification",
                  description: `The role ${designation} is successfull deleted.`,
                  placement: "topRight",
                });
                setDeleteVidsible(false);
              });
            }}
          >
            DELETE
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={() => {
              setDesignation(null);
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

export default MasterSalary;
