import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Layout, Divider, Checkbox } from "antd";
import "./Login.scss";
import Logo from "../Dashboard/assets/logo.png";
import LoginLogo from "./assets/login.jpg";
import { useNavigate } from "react-router-dom";
import PasswordResetRequest from "../Dashboard/DashboardSubComponents/PasswordResetRequest";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authActions";

const { Header } = Layout;

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [isError, setIsError] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state?.auth?.loginMinistry?.data?.data || null
  );
  const loginSuccess = useSelector(
    (state) => state?.auth?.loginMinistry?.success?.status || false
  );
  const fetching = useSelector(
    (state) => state?.auth?.loginMinistry?.fetching || false
  );

  useEffect(() => {
    if (loginSuccess) {
      localStorage.setItem("authToken", data?.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data?.username);
      localStorage.setItem("email", data?.email);
      localStorage.setItem("type", data?.type);
      localStorage.setItem("id", data?.empId);
      localStorage.setItem("initials", data?.nameWithInitials);

      if (jwtDecode(data?.token).type === "subject-officer") {
        history(`/subject-officer-dashboard/${data?.username}`);
      } else if (jwtDecode(data?.token).type === "manager") {
        history(`/manager-dashboard/${jwtDecode(data?.token).username}`);
      } else {
        history(`/user-dashboard/${jwtDecode(data?.token).username}`);
      }
    }
  }, [loginSuccess]);

  const loginHandler = async (e) => {
    //handler method for login
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => {
    //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <center>
            <img src={Logo} style={{ maxWidth: "100px" }} />
            <h1 id="header" style={{ fontFamily: "serif", fontSize: "50px" }}>
              Ministry of Fisheries{" "}
            </h1>

            <Divider />
          </center>
        </Header>
      </Layout>

      <div className="login-page">
        <Row>
          <Col className="left-side" xl={15} lg={15} md={24} sm={24}>
            <div className="left-side-inner-wrap">
              <div className="title">Human Resource Management System</div>
              <center>
                {error && (
                  <span style={{ color: "white", background: "orange" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span style={{ color: "white", background: "red" }}>
                    {available}
                  </span>
                )}
              </center>
              <div className="text-block">
                Log in to your account if you already have an account
              </div>
              <Form onFinish={loginHandler}>
                <label>Email</label>
                <Input
                  label={"EMAIL"}
                  name={"email"}
                  fieldType={"email"}
                  size={"large"}
                  placeholder={"e.g example@gmail.com"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <Input
                  label={"PASSWORD"}
                  name={"password"}
                  fieldType={"password"}
                  size={"large"}
                  type="password"
                  placeholder="type your password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Checkbox onClick={showPassword}>Show Password</Checkbox>
                <br /> <br /> <br />
                {/* <a className="forget-text">Forgot password?</a> */}
                <PasswordResetRequest />
                <div className="btn-wrap">
                  <center>
                    {isError && (
                      <small style={{ color: "red" }}>
                        Something went wrong. Please try again later.
                      </small>
                    )}
                    <Button
                      className="submit-btn"
                      htmlType="submit"
                      type={"primary"}
                      disabled={fetching}
                      loading={fetching}
                    >
                      SUBMIT
                    </Button>
                  </center>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="right-side" xl={9} lg={9} md={0} sm={0}>
            {window.innerWidth > 900 && (
              <div
                className="background-img-container"
                style={{ backgroundImage: `url(${LoginLogo})` }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Login;
