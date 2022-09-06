import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  BranchesOutlined,
  DeleteOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
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

const EditEmployee = () => {
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
  const [_id, set_id] = useState("");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");
  const history = useNavigate();

  const [loading, setLoading] = useState(false); //additional
  const [deleting, setDeleting] = useState(false); //additional
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get(`/api/auth/get/${id}`)
        .then((res) => {
          setEmpId(res.data.empId);
          setNIC(res.data.nic);
          setNameWithInitials(res.data.nameWithInitials);
          setFullName(res.data.fullName);
          setAddress(res.data.address);
          setPhoneNumber(res.data.phoneNumber);
          setEmail(res.data.email);
          setDesignation(res.data.designation);
          setBranch(res.data.branch);
          set_id(res.data._id);
        })
        .catch(() => null);
    })();
  }, []);

  const employeeHandlerUpdate = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/api/auth/update/${_id}`,
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
        },
        config
      );
      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the user details 😘",
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
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const deleteHandler = async (placement) => {
    setDeleting(true);
    await axios
      .delete(`/api/auth/delete/${_id}`)
      .then(() => {
        setTimeout(() => {
          //set a time out
          setLoading(false);
          notification.info(
            {
              message: `Notification`,
              description: "Successfully deleted the user details 😘",
              placement,
            },
            5000
          );
          setDeleting(false);
          history(
            `/subject-officer-dashboard/${localStorage.getItem(
              "username"
            )}?_optE=employee`
          );
        }, 5000);
      })
      .catch((err) => alert(err));
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
          onFinish={() => employeeHandlerUpdate("top")}
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
            initialValue={empId}
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
            initialValue={nameWithInitials}
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
            initialValue={fullName}
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
              maxLength={100}
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
            initialValue={nic}
          >
            <Input
              style={{ width: "50%" }}
              placeholder="enter your NIC"
              prefix={<FileDoneOutlined className="site-form-item-icon" />}
              suffix={[
                <span style={{ marginRight: "10px" }}>
                  {String(nic).length === 9 && "V"}
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
            initialValue={address}
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
            initialValue={phoneNumber}
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
            initialValue={email}
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
            initialValue={designation}
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
              maxLength={20}
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
            initialValue={branch}
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

          <Form.Item {...tailLayout}>
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              {loading ? (
                <>
                  <Spin /> Updating in Progess...
                </>
              ) : (
                "Submit"
              )}
            </Button>{" "}
            &nbsp;&nbsp; &nbsp;&nbsp;
            {localStorage.getItem("username") === "subject-officer" && (
              <Button
                type="dashed"
                htmlType="button"
                onClick={() => deleteHandler("top")}
                icon={<DeleteOutlined />}
              >
                {deleting ? (
                  <>
                    <Spin /> Deleting in progress
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default EditEmployee;
