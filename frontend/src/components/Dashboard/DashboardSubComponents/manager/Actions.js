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
  Button,
} from "antd";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const { Panel } = Collapse;

const Actions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [initialValues, setInitialValues] = useState({
    amount: null,
    finalPayment: null,
  });
  const [submitted, setSubmitted] = useState(false);
  let [amount, setAmount] = useState(null);

  const [form] = Form.useForm();
  const search = window.location.search;

  useEffect(() => {
    (async () =>
      await axios.get("/salary").then((res) => {
        if (toggle) {
          setData(res?.data?.filter(({ status }) => status !== "PENDING"));
          setAmount(
            res?.data
              ?.filter(({ status }) => status !== "PENDING")
              .map(({ amount }) => amount)
          );
        } else {
          setData(res?.data?.filter(({ status }) => status === "PENDING"));
          setAmount(
            res?.data
              ?.filter(({ status }) => status === "PENDING")
              .map(({ amount }) => amount)
          );
        }
        setLoading(false);
      }))();
  }, [search, toggle, submitted]);

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

  const handleSubmit = async (value, index) => {
    try {
      await axios
        .put(`/salary/status/${value?._id}`, {
          amount: initialValues[index].amount,
          finalPayment: initialValues[index].finalPayment,
          datePaid: new Date(),
        })
        .then(
          async () =>
            await axios
              .post("/salary/notify-user", {
                email: value?.email,
                type: "salary",
              })
              .then(() => {
                notification.info({
                  message: `Notification`,
                  description:
                    "Payment will be notified user through the email.",
                  placement: "topRight",
                });
                setSubmitted(true);
                setInitialValues({ amount: null, finalPayment: null });
              })
        );
    } catch (error) {
      notification.error({
        message: "Something Went Wrong",
        description: error,
        placement: "topRight",
      });
    }
  };

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
    setInitialValues(form.getFieldsValue());
    amount[index] = e;
  };

  const disablePermission = (value, btn = false, index = 0) => {
    if (btn) {
      if (amount[index] === "null" || !amount[index]) return true;
      return false;
    } else if (value?.status === "PENDING") {
      if (!(value?.workedDays >= 20)) return true;
      return false;
    }
    return true;
  };

  const getFinalPaymentValue = (value, index) => {
    if (value?.status === "PAID") return value?.finalPayment;
    return initialValues[index]?.finalPayment;
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

                <Form form={form} onFinish={() => handleSubmit(value, index)}>
                  <Form.Item
                    name={[index, "amount"]}
                    // rules={[{ required: true, message: "Amount is required!" }]}
                  >
                    Amount(Rs.) : {value?.status === "PAID"}
                    <Input
                      placeholder={!disablePermission(value) && "Enter amount"}
                      disabled={disablePermission(value)}
                      type={"number"}
                      onChange={(e) =>
                        setFinalPayment(e.target.value, index, value)
                      }
                      value={amount[index]}
                    />
                  </Form.Item>

                  <Form.Item name={[index, "finalPayment"]}>
                    Final Payment(Rs.) :{" "}
                    <Input
                      disabled
                      type={"number"}
                      value={getFinalPaymentValue(value, index)}
                    />
                  </Form.Item>
                </Form>
              </div>
              {value?.status === "PENDING" && (
                <div className="btn-submit-div">
                  <Button
                    disabled={disablePermission(value, true, index)}
                    className="submit"
                    type={"primary"}
                    onClick={() => form.submit()}
                  >
                    SUBMIT
                  </Button>
                </div>
              )}
            </Panel>
          ))
        )}
      </Collapse>
    </>
  );
};

export default Actions;
