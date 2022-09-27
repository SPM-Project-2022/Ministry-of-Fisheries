import { Button, Table } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSalaryDetails } from "../../DashboardRedux/dashboardActions";

const PaymentHistory = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const doc = new jsPDF("p", "pt", "a2");

  const salary = useSelector(
    (state) => state?.dashboard?.salary?.data?.data || []
  );

  const fetching = useSelector(
    (state) => state?.dashboard?.salary?.fetching || false
  );

  useEffect(() => {
    if (location?.search.includes("history")) {
      dispatch(getSalaryDetails());
      setData(salary?.filter(({ status }) => status === "PAID"));
    }
  }, [location.search]);

  const columns = [
    {
      title: "Payment ID",
      render: (_, record) => <div>#{record?._id}</div>,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.designation.length - b.designation.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
    },
    {
      title: "Date Paid",
      dataIndex: "datePaid",
      sorter: true,
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => {
        const month1 = new Date(a.datePaid);
        const month2 = new Date(b.datePaid);
        return month1.getMonth() > month2.getMonth();
      },

      render: (_, record) => (
        <div>{moment(record?.datePaid).format("DD MMM YYYY")}</div>
      ),
    },
    { title: "Status", dataIndex: "status" },
  ];

  const print = () => {
    autoTable(doc, {
      head: [
        [
          "PID",
          "Name",
          "Email",
          "NIC",
          "Designation",
          "Amount",
          "Date Paid",
          "Status",
        ],
      ],
      theme: "grid",
      body: data.map((val) => [
        val?._id,
        val?.fullName,
        val?.email,
        val?.nic,
        val?.designation,
        val?.amount,
        moment(val?.datePaid).format("DD MMM, YYYY"),
        val?.status,
      ]),
    });

    doc.save(`paymentHistory_${new Date()}.pdf`);
  };
  return (
    <div>
      <Button style={{ float: "right" }} onClick={print}>
        Generate Report
      </Button>
      <br /> <br />
      <Table
        id="printArea"
        columns={columns}
        dataSource={data}
        loading={fetching}
        size={data?.length}
      />
    </div>
  );
};

export default PaymentHistory;
