import React from "react";
import {
  Collapse,
  Select,
  Form,
  notification,
  Empty,
  Spin,
  Switch,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const { Panel } = Collapse;

const Actions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const [form] = Form.useForm();
  const search = window.location.search;

  useEffect(() => {
    (async () =>
      await axios.get("/salary").then((res) => {
        if (toggle)
          setData(res?.data?.filter(({ status }) => status !== "PENDING"));
        else setData(res?.data?.filter(({ status }) => status === "PENDING"));
        setLoading(false);
      }))();
  }, [search, toggle]);

  const genExtra = (value) => (
    <span className={toggle ? "paid" : "pending"}>
      <a></a>
    </span>
  );

  const setHeader = (value) => (
    <>
      {value?.fullName} &nbsp;
      <i style={{ color: "green" }}> {value?.email}</i>
    </>
  );

  const handleSubmit = async (value) => {};

  const handleToggle = (checked) => {
    setToggle(checked);
    setLoading(true);
  };

  return (
    <>
      <div style={{ float: "right" }}>
        Show Paid Users <Switch checked={toggle} onChange={handleToggle} />
      </div>
      <br />
      <br />
      <Collapse defaultActiveKey={["1"]}>
        {loading ? (
          <center>
            <Spin size="large" style={{ marginTop: "200px" }} />
          </center>
        ) : data.length === 0 ? (
          <center>
            {" "}
            <Empty
              description={
                <>
                  {toggle ? (
                    <>
                      {" "}
                      <span>No Data</span>
                    </>
                  ) : (
                    <>
                      <span>No Payments Remaining</span>
                      <br />
                      <span style={{ color: "red" }}>
                        THERE ARE NO USERS TO PAY
                      </span>
                    </>
                  )}
                </>
              }
            />
          </center>
        ) : (
          data.map((value, index) => (
            <Panel
              header={setHeader(value)}
              key={index + 1}
              extra={genExtra(value?.status)}
            ></Panel>
          ))
        )}
      </Collapse>
    </>
  );
};

export default Actions;
