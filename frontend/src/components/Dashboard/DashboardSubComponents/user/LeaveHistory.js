import { Button, Table } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useState, useEffect } from "react";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const LeaveHistory = () => {
  const doc = new jsPDF("p", "pt", "a2");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    (async () => {
      await fetch("/ministry/leaves")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoader(!loader);
        });
    })();
  }, []);

  const filteredData = data.filter(
    (el) => el?.status !== "pending" && el?.email !== "email"
  );

  const columns = [
    {
      title: "Leave Type",
      dataIndex: "type",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.type - b.type,
      sortDirections: ["descend"],
    },
    {
      title: "Reason",
      dataIndex: "reason",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.reason - b.reason,
    },
    {
      title: "Leave Start Date",
      dataIndex: "date",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sorter: (a, b) => a.nic.length - b.nic.length,
      render: (text) => (text.length === 9 ? text + "V" : text),
    },

    {
      title: "No of Days",
      dataIndex: "duration",
      sorter: (a, b) => a.duration.length - b.duration.length,
    },
    {
      title: "Name",
      dataIndex: "nameWithInitials",
      sorter: (a, b) => a.nameWithInitials - b.nameWithInitials,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status - b.status,
      render: (text) =>
        text === "accepted" ? (
          <span style={{ color: "green" }}>{text.toUpperCase()}</span>
        ) : (
          <span style={{ color: "red" }}>{text.toUpperCase()}</span>
        ),
    },
  ];

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
      <Button style={{ float: "right" }} onClick={print}>
        Generate Report
      </Button>
      <br /> <br />
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

export default LeaveHistory;
