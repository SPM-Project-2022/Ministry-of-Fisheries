import React from "react";
import {
  Collapse,
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
import { useDispatch, useSelector } from "react-redux";
import {
  clearSubmitSalary,
  getSalaryDetails,
  notifyUserEmail,
  submitSalary,
} from "../../DashboardRedux/dashboardActions";
const { Panel } = Collapse;

const Actions = () => {
  const [toggle, setToggle] = useState(false);
  const [initialValues, setInitialValues] = useState({
    amount: null,
    finalPayment: null,
  });

  let [amount, setAmount] = useState(null);

  const [form] = Form.useForm();
  const search = window.location.search;

  const dispatch = useDispatch();

  const salary = useSelector(
    (state) => state?.dashboard?.salary?.data?.data || []
  );

  const submitted = useSelector(
    (state) => state?.dashboard?.submitSalary?.success?.status || false
  );

  const fetching = useSelector(
    (state) => state?.dashboard?.salary?.fetching || false
  );

  useEffect(() => {
    dispatch(getSalaryDetails());
    if (toggle) {
      setAmount(
        salary
          ?.filter(({ status }) => status !== "PENDING")
          .map(({ amount }) => JSON.parse(amount))
      );
    } else
      setAmount(
        salary
          ?.filter(({ status }) => status === "PENDING")
          .map(({ amount }) => JSON.parse(amount))
      );
    if (submitted) {
      notification.info({
        message: `Notification`,
        description: "Payment will be notified user through the email.",
        placement: "topRight",
      });
      dispatch(clearSubmitSalary());
    }
  }, [search, toggle, submitted]);

  useEffect(() => {
    return () => {
      dispatch(clearSubmitSalary());
    };
  }, []);

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
      dispatch(
        submitSalary(value?._id, {
          amount: initialValues[index].amount,
          finalPayment: initialValues[index].finalPayment,
          datePaid: new Date(),
        })
      );
      dispatch(
        notifyUserEmail({
          email: value?.email,
          type: "salary",
        })
      );

      setInitialValues({ amount: null, finalPayment: null });
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
    setInitialValues({
      amount: null,
      finalPayment: null,
    });
  };

  const setFinalPayment = (e, index, val) => {
    form.setFieldsValue({
      [index]: {
        ...initialValues,
        amount: e,
        finalPayment: parseFloat(e) + parseFloat(val?.extra),
      },
    });
    setInitialValues(form.getFieldsValue());
    amount[index] = e;
  };

  const disablePermission = (value, btn = false, index = 0) => {
    if (btn) {
      if (amount?.[index] === "null" || !amount?.[index]) return true;
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
      <Form form={form}>
        <Collapse defaultActiveKey={["1"]}>
          {fetching ? (
            <center>
              <Spin size="large" style={{ marginTop: "200px" }} />
            </center>
          ) : salary?.length === 0 ? (
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
            salary
              ?.filter(({ status }) => {
                if (toggle) return status === "PAID";
                return status === "PENDING";
              })
              .map((value, index) => (
                <Panel
                  header={setHeader(value)}
                  key={index + 1}
                  extra={genExtra(value?.status)}
                  forceRender={true}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
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

                    <Form.Item
                      name={[index, "amount"]}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!(parseInt(value).toString().length >= 16))
                              return Promise.resolve();
                            return Promise.reject(
                              new Error("Maximum number limit exceeded.")
                            );
                          },
                        }),
                        {
                          pattern: new RegExp(/^[0-9,.]{0,30}$/i),
                          message: "Numbers only without spaces",
                        },
                      ]}
                    >
                      Amount(Rs.) :
                      <Input
                        placeholder={
                          !disablePermission(value) && "Enter amount"
                        }
                        disabled={disablePermission(value)}
                        onChange={(e) => {
                          setFinalPayment(e.target.value, index, value);
                          form.validateFields([[index, "amount"]]);
                        }}
                        value={amount?.[index]}
                        maxLength={30}
                        showCount={!disablePermission(value)}
                      />
                    </Form.Item>

                    <Form.Item name={[index, "finalPayment"]}>
                      Final Payment(Rs.) :{" "}
                      <Input
                        disabled
                        maxLength={30}
                        value={getFinalPaymentValue(value, index)}
                      />
                    </Form.Item>
                  </div>
                  {value?.status === "PENDING" && (
                    <div className="btn-submit-div">
                      <Button
                        disabled={disablePermission(value, true, index)}
                        className="submit"
                        type={"primary"}
                        onClick={() =>
                          form
                            .validateFields()
                            .then(() => handleSubmit(value, index))
                        }
                      >
                        SUBMIT
                      </Button>
                    </div>
                  )}
                </Panel>
              ))
          )}
        </Collapse>
      </Form>
    </>
  );
};

export default Actions;
