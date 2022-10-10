import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, notification, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "../../styles/TabContainer.scss";

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

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (confirm, clearFilters, dataIndex) => {
    clearFilters();
    setSearchText("");
    confirm({
      closeDropdown: false,
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(confirm, clearFilters, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (
      <>
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      </>
    ),
  });

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
      ...getColumnSearchProps("designation"),
    },
    {
      title: "Salary(Rs.)",
      dataIndex: "salary",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.salary > b.salary,
    },
    {
      title: "Status",
      render: (_, record) => (
        <div>
          <DeleteOutlined
            className="icon-delete"
            onClick={async () => {
              await axios.delete(`/master-table/${record?._id}`).then(() => {
                setSuccess(true);
                notification.success({
                  message: "Notification",
                  description: `The role ${record?.designation} is successfull deleted.`,
                  placement: "topRight",
                });
              });
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
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (type) => {
    try {
      type === "ADD"
        ? await axios.post("/master-table", {
            id: [...data]?.pop()?.id + 1,
            designation,
            salary,
          })
        : await axios.put(`/master-table/${id}`, {
            designation,
            salary,
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
          <Form
            form={form}
            onFinish={() => handleSubmit(status === "edit" ? "UPDATE" : "ADD")}
          >
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
