import { Modal, Button, Tooltip, Input } from "antd";
import React, { useState } from "react";
import { Form } from "antd";
import { InfoCircleOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";

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

export default () => {
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();

  const forgotPasswordHandler = async () => {
    //method for forgot password handling

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.verify);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {location.pathname === "/" ? (
        <a className="forget-text" onClick={showModal}>
          Forgot password?
        </a>
      ) : (
        <center>
          <Button type="primary" onClick={showModal}>
            Click Here To Request
          </Button>
        </center>
      )}
      <Modal
        visible={visible}
        title="Password Request Form"
        onCancel={handleCancel}
        footer={false}
      >
        <center>
          {error && <span style={{ color: "red" }}>{error}</span>}
          {success && <span style={{ color: "green" }}>{success}</span>}
        </center>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={forgotPasswordHandler}
        >
          <center>
            {/* {error && <span style={{ color: "red" }}>{error}</span>} */}
          </center>
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
              style={{ width: "100%" }}
              placeholder="write your registered email only"
              prefix={<MailOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Enter email that you already have">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              showCount
              maxLength={50}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Request
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button htmlType="button" onClick={handleCancel}>
              Return
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
