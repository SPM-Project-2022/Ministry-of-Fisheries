import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Spin,
  Tooltip,
  notification,
} from "antd";
import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LeaveRequest = () => {
  const [loader, setLoader] = useState(false);
  const [nic, setNIC] = useState("");
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [name, setName] = useState("");
  const status = "pending";
  const empId = localStorage.getItem("id");
  const nameWithInitials = localStorage.getItem("initials");

  const [loading, setLoading] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  const [form] = Form.useForm();

  const onChangeDate = (type) => {
    setDate(type);
  };

  const onChangeTime = (type) => {
    setTime(type);
  };

  const onChangeDuration = (type) => {
    if (type === "5+") {
      form.setFieldsValue({ type: "Medical Leave" });
    }
    setDuration(type);
  };

  const onChangeType = (type) => {
    setType(type);
  };

  const leaveHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        //use axios API
        "/ministry/leaves/create",
        {
          type,
          reason,
          date,
          time,
          nic,
          duration,
          name,
          status,
          empId,
          nameWithInitials,
        },
        config
      );
      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Applied for the Leave 😘",
          placement,
        });
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      form.resetFields();
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={() => leaveHandler("top")}
        >
          <Form.Item
            name="type"
            label="Leave Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Type"
              onChange={onChangeType}
              allowClear
              style={{ width: "50%", padding: "6px" }}
              required
              disabled={
                form.getFieldValue("no-of-dates") === "5+" ? true : false
              }
            >
              <Option value="Casual Leave">☑️ Casual Leave</Option>
              <Option value="Medical Leave">☑️ Medical Leave</Option>
              <Option value="Annual Leave">☑️ Annual Leave</Option>
              <Option value="Duty Leave">☑️ Duty Leave</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="leave date"
            label="Leave Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={onChangeTime} />
          </Form.Item>

          {/* <Form.Item
            name="leave time"
            label="Leave Time"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker onChange={onChangeTime} />
          </Form.Item> */}

          <Form.Item
            name="no-of-dates"
            label="No of Days"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select Duration"
              onChange={onChangeDuration}
              allowClear
              style={{ width: "50%", padding: "6px" }}
              required
            >
              <Option value="1/2">◻️1/2 Day</Option>
              <Option value="1">◻️1 Day</Option>
              <Option value="1 1/2">◻️ 1 1/2 Days</Option>
              <Option value="2">◻️ 2 Days</Option>
              <Option value="2 1/2">◻️ 2 1/2 Days</Option>
              <Option value="3">◻️ 3 Days</Option>
              <Option value="3 1/2">◻️ 3 1/2 Days</Option>
              <Option value="4">◻️ 4 Days</Option>
              <Option value="4 1/2">◻️ 4 1/2 Days</Option>
              <Option value="5">◻️ 5 Days</Option>
              {form.getFieldValue("type") !== "Casual Leave" && (
                <Option value="5+">◻️ 5+ Days</Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            name="nic"
            label="Substitute Person's NIC"
            rules={[
              {
                required: true,
              },
              { min: 9, message: "NIC be minimum 10 characters." },
              { max: 12 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter person NIC"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <span style={{ marginRight: "10px" }}>
                  {nic.length === 9 && "V"}
                </span>,
                <Tooltip title="Enter employee National Identity Card ex: 991330534V">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>,
              ]}
              showCount
              maxLength={12}
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
              type="number"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Substitute Person's name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter person name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Applying in Progress...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LeaveRequest;
