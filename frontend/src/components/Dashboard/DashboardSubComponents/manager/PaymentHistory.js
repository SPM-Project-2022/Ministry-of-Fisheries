import { Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSalaryDetails } from "../../DashboardRedux/dashboardActions";

const PaymentHistory = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();

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
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={fetching}
        size={data?.length}
      />
    </div>
  );
};

export default PaymentHistory;
