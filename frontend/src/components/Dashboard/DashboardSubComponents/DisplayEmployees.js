import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetColumnSearchProps } from "./common/Search";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const DisplayEmployees = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    (async () => {
      await fetch("/api/auth")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoader(!loader);
        });
    })();
  }, []);

  const filteredData = data.filter((el) => el.type === "user");
  const history = useNavigate();

  const columns = [
    {
      title: "Employee Id",
      dataIndex: "empId",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.empId - b.empId,
      ...GetColumnSearchProps("empId"),
      sortDirections: ["descend"],
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
      ...GetColumnSearchProps("nameWithInitials"),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      //...GetColumnSearchProps("fullName"),
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sorter: (a, b) => a.nic.length - b.nic.length,
      //...GetColumnSearchProps("nic"),
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
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredData}
        onChange={onChange}
        loading={loader}
        showHeader
        sticky
      />
    </>
  );
};

export default DisplayEmployees;
