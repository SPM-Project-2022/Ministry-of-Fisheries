import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  BranchesOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const AddEmployee = () => {
  const [loader, setLoader] = useState(false);
  const [nic, setNIC] = useState("");
  const [empId, setEmpId] = useState("");
  const [nameWithInitials, setNameWithInitials] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [branch, setBranch] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const type = "user";
  const history = useNavigate();

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  const employeeHandler = async (placement) => {
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
        "/api/auth/register",
        {
          empId,
          nameWithInitials,
          fullName,
          nic,
          address,
          phoneNumber,
          email,
          designation,
          branch,
          username,
          password,
          type,
        },
        config
      );

      await axios.post(
        "/api/auth/notifyuser",
        { email, username, password },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Submitted the user details 😘",
          placement,
        });
        history("/subject-officer-dashboard/subject-officer?_optE=employee");
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      //form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

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
          onFinish={() => employeeHandler("top")}
        >
          <center>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </center>
          <Form.Item
            name="employee id"
            label="Employee Id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your employee id"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter employee Id ex: EMP001">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={10}
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="initials"
            label="Name with initials"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your name with initilas">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={100}
              value={nameWithInitials}
              onChange={(e) => setNameWithInitials(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="full name"
            label="Full Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="write your full name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Please provide your full name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={200}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="nic"
            label="NIC"
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
              placeholder="enter your NIC"
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
            name="address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              style={{ width: "50%" }}
              placeholder="enter your address"
              showCount
              maxLength={200}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="phone number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              {
                min: 10,
                message: "Phone Number must be minimum 10 characters.",
              },
              { max: 10 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your phone number"
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your phone number ex: 0774258796">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={10}
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
              { type: "email" },
              { max: 50 },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your email ex: admin@example.com">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={50}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your designation"
              prefix={<DesktopOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your designation ex: Associate Manager">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={50}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="branch"
            label="Branch"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your branch"
              prefix={<BranchesOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your branch ex: Colombo">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={20}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </Form.Item>

          <center>Create User Logins</center>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your username"
              prefix={<UserAddOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your username ex: Jhon">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={50}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="Enter your password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter your password ex: XXXXX">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={20}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Planning in Progess...
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

export default AddEmployee;
