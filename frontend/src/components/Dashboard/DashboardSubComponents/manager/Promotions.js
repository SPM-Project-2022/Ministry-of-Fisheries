import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Modal,
  notification,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";

const Promotions = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [cat, setCat] = useState([]);
  const [promo, setPromo] = useState("");
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");


  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    (async () => {
      await fetch("/api/auth")
        .then((res) => res.json())
        .then((json) => {
          setData(json.filter((el) => el.type === "user"));
          setLoader(false);
          setSuccess(false);
        });
    })();
    (async () =>
      await axios.get("/master-table").then((res) => {
        setCat(res?.data?.map((val) => val?.designation));
      }))();
  }, [success]);

  const history = useNavigate();

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
      title: "Employee Id",
      dataIndex: "empId",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.empId - b.empId,
      sortDirections: ["ascend", "descend"],
      render: (text) => (
        <a
          onClick={() =>
            history(
              `/subject-officer-dashboard/${localStorage.getItem(
                "username"
              )}?_edit=true&_id=${text}`
            )
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "Name with Initials",
      dataIndex: "nameWithInitials",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.nameWithInitials.length - b.nameWithInitials.length,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sorter: (a, b) => a.nic.length - b.nic.length,
      render: (text) => (text.length === 9 ? text + "V" : text),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: (a, b) => a.designation.length - b.designation.length,
      filters: [
        {
          text: "Manager",
          value: "manager",
        },
        {
          text: "Driver",
          value: "driver",
        },
        {
          text: "Archietect",
          value: "archietect",
        },
        {
          text: "Servant",
          value: "servant",
        },
        {
          text: "Writer",
          value: "writer",
        },
        {
          text: "Watcher",
          value: "watcher",
        },
        {
          text: "Secretary",
          value: "secretary",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) =>
        record.designation.toLowerCase().includes(value) === 0,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      sorter: (a, b) => a.branch.length - b.branch.length,
      filters: [
        {
          text: "Colombo",
          value: "colombo",
        },
        {
          text: "Nugegoda",
          value: "nugegoda",
        },
        {
          text: "Kandy",
          value: "kandy",
        },
        {
          text: "Kurunrgala",
          value: "kurunegala",
        },
        {
          text: "Jaffna",
          value: "jafna",
        },
        {
          text: "Anuradhapura",
          value: "anuradhapura",
        },
        {
          text: "Trincomalee",
          value: "trincomalee",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) =>
        record.branch.toLowerCase().includes(value) === 0,
    },
    {
      title: "",
      render: (_, record) => {
        return (
          <div
            onClick={() => {
              setName(record?.fullName);
              setVisible(true);
              setId(record?._id);
              setEmail(record?.email);
            }}
            style={{ cursor: "pointer" }}
          >
            <EditOutlined /> Promote
          </div>
        );
      },
    },
  ];

  const handlePromotion = async () => {
    try {
      await axios
        .put(`/api/auth/promo/${id}`, { designation: promo })
        .then(async () => {
          setVisible(false);
          await axios
            .post("/api/auth/notifyUser", { email, type: "promo", role: promo })
            .then(() =>
              notification.success({
                message: "Notification",
                description: `The role ${name} is successfully promoted to ${promo} position.`,
                placement: "topRight",
              })
            );
        });
      setSuccess(true);
      setPromo(null);
    } catch (error) {}
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loader}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title={`PROMOTE: ${name}`}
        destroyOnClose={true}
        onCancel={() => {
          setVisible(false);
          setPromo(null);
        }}
        visible={visible}
        footer={null}
      >
        <div>
          <center>
            Select Category :{" "}
            <Select style={{ width: 300 }} onSelect={(e) => setPromo(e)}>
              {cat.map((val) => (
                <Select.Option value={val}>{val}</Select.Option>
              ))}
            </Select>
            <br /> <br /> <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type={"primary"}
                disabled={!promo}
                onClick={() => handlePromotion()}
              >
                DONE
              </Button>
            </div>
          </center>
        </div>
      </Modal>
    </>
  );
};

export default Promotions;
