import React from "react";
import {
  Collapse,
  Select,
  Form,
  notification,
  Empty,
  Spin,
  Switch,
  Input,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const { Panel } = Collapse;

const Actions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const initialValues = { amount: null, finalPayment: null };

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
      <span style={{ fontWeight: "bold" }}>{value?.fullName}</span> &nbsp;
      <i style={{ color: "green" }}> {value?.email}</i>
    </>
  );

  const handleSubmit = async (value) => {};

  const handleToggle = (checked) => {
    setToggle(checked);
    setLoading(true);
  };

  const setFinalPayment = (e, index, val) => {
    form.setFieldsValue({
      [index]: {
        ...initialValues,
        amount: e,
        finalPayment: parseInt(e) + parseInt(val?.extra),
      },
    });
    console.log("e", e);
    console.log("index", index);
    console.log("val", val);
    console.log("form", form.getFieldsValue());
    // form.setFieldsValue(parseInt(e));
  };

  console.log("form", form.getFieldsValue());

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
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <span>No of Days Worked : {value?.workedDays}</span>
                  <br />
                  <span>
                    Eligibility :{" "}
                    {value?.workedDays >= 20 ? (
                      <span style={{ color: "green" }}>ELIGIBLE</span>
                    ) : (
                      <span style={{ color: "red" }}>NOT ELIGIBLE</span>
                    )}
                  </span>
                  <br />
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    (Employees should be worked at least 20days)
                  </span>
                  <br />
                  <span>Designation : {value?.designation}</span>
                  <br />
                  <span>
                    Extra Fees :{" "}
                    {value?.workedDays >= 20 ? (
                      <span style={{ color: "green" }}>APPLICABLE</span>
                    ) : (
                      <span style={{ color: "red" }}>NOT APPLICABLE</span>
                    )}
                  </span>
                  <br />
                  <span>Extra Amount : Rs.{value?.extra}</span>
                </div>

                <Form form={form} initialValues={initialValues}>
                  <Form.Item name={[index, "amount"]}>
                    Amount(Rs.) :{" "}
                    <Input
                      placeholder="Enter amount"
                      disabled={!(value?.workedDays >= 20)}
                      type={"number"}
                      onChange={(e) =>
                        setFinalPayment(e.target.value, index, value)
                      }
                    />
                  </Form.Item>
                  {console.log(form.getFieldsValue(),"test")}
                  {/* <Form.Item name={[index, "finalPayment"]}>
                    Final Payment(Rs.) : <Input value={form.getFieldsValue()} disabled type={"number"} />
                  </Form.Item> */}
                </Form>
              </div>
            </Panel>
          ))
        )}
      </Collapse>
    </>
  );
};

export default Actions;
