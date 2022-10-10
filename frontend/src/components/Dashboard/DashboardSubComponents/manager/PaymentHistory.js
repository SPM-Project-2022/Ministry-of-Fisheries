import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSalaryDetails } from "../../DashboardRedux/dashboardActions";

const PaymentHistory = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const doc = new jsPDF("p", "pt", "a2");

  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

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
      title: "Payment ID",
      render: (_, record) => <div>#{record?._id}</div>,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => a.designation.length - b.designation.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sortDerection: ["acend", "decend"],
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
    },
    {
      title: "Date Paid",
      dataIndex: "datePaid",
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
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default PaymentHistory;
