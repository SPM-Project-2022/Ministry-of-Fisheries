import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/TabContainer.scss";

const MasterSalary = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [designation, setDesignation] = useState(null);
  const [salary, setSalary] = useState(null);
  const [status, setStatus] = useState("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (_, record) => <div>#{record?.id}</div>,
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.id > b.id,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.designation.length - b.designation.length,
    },
    {
      title: "Salary(Rs.)",
      dataIndex: "salary",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.salary > b.salary,
    },
    {
      title: "Status",
      render: (_, record) => (
        <div>
          <DeleteOutlined className="icon-delete" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EditOutlined
            className="icon-edit"
            onClick={() => {
              setVisible(true);
              setDesignation(record?.designation);
              setSalary(record?.salary);
              setStatus("edit");
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      await axios.post("/master-table", {
        id: [...data]?.pop()?.id + 1,
        designation,
        salary,
      });
      notification.success({
        message: "Notification",
        description: `The role ${designation} is successfully added.`,
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
      />
      <div>
        <Button className="btn-role" onClick={() => setVisible(true)}>
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
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <Form form={form} onFinish={() => handleSubmit()}>
            <Form.Item name={"designation"}>
              Role Name :{" "}
              <Input
                placeholder="Enter Role Name"
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
              />
            </Form.Item>
            <Form.Item name={"salary"}>
              Salary(Rs.) :{" "}
              <Input
                name={"salary"}
                placeholder="Enter Salary"
                type="number"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
              />
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type={"primary"}
                  disabled={disablePermission()}
                  onClick={() => form.submit()}
                >
                  {status === "edit" ? "UPDATE" : "ADD"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MasterSalary;
