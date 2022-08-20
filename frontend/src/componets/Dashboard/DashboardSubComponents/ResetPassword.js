import { Button, Divider, Form, Input, Layout, notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "../../Dashboard/assets/logo.png";
import "../../Login/Login.scss";

const { Header } = Layout;

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

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const { resetToken } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  const [form] = Form.useForm();

  const resetPasswordHandler = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/auth/passwordreset/${resetToken}`, { password });

      setTimeout(() => {
        notification.info({
          message: "Password Reset Successfully",
          placement: "top",
        });
        setLoading(false);
      }, 3000);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  return (
    <>
      {" "}
      {loader === false ? (
        <center>
          <Spin size="large" style={{ marginTop: "300px" }} />
        </center>
      ) : (
        <div>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: 0, textAlign: "center" }}
            >
              <center>
                <img src={Logo} style={{ maxWidth: "100px" }} />
                <h1
                  id="header"
                  style={{ fontFamily: "serif", fontSize: "50px" }}
                >
                  Ministry of Fisheries{" "}
                </h1>

                <Divider />
              </center>
            </Header>
          </Layout>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <center>
            <h2>Leave Management System</h2>
            <h3 style={{ color: "red" }}>Reset Password Application</h3>
          </center>
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={resetPasswordHandler}
          >
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
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {loading ? (
                  <>
                    <Spin /> Reseting in Progress
                  </>
                ) : (
                  "Reset"
                )}
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="/" className="forget-text">
                Back to Home
              </a>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
