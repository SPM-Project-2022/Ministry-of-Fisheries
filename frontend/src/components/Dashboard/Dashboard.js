import { useState } from "react";
import { Layout, Menu, Breadcrumb, Button, Empty } from "antd";
import {
  UserAddOutlined,
  PullRequestOutlined,
  HistoryOutlined,
  AuditOutlined,
  SettingOutlined,
  LogoutOutlined,
  SendOutlined,
  CrownOutlined,
  ProfileOutlined,
  HomeOutlined,
  CalculatorOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles/Dashboard.css";
import Logo from "./assets/logo.png";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CarouselView from "./DashboardSubComponents/CarouselView";
import DisplayLeaves from "./DashboardSubComponents/DisplayLeaves";
import DisplayEmployees from "./DashboardSubComponents/DisplayEmployees";
import AddEmployee from "./DashboardSubComponents/AddEmployee";
import EditEmployee from "./DashboardSubComponents/EditEmployee";
import PasswordResetRequest from "./DashboardSubComponents/PasswordResetRequest";
import LeaveRequest from "./DashboardSubComponents/LeaveRequest";
import Profile from "./DashboardSubComponents/Profile";
import Leaves from "./DashboardSubComponents/Leaves";
import LeaveHistory from "./DashboardSubComponents/LeaveHistory";
import CalculateSalary from "./DashboardSubComponents/manager/CalculateSalary";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboard, setDashboard] = useState("dashboard");
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const queryL = params.get("_optL");
  const queryE = params.get("_optE");
  const queryA = params.get("_optA");
  const queryH = params.get("_optH");
  const queryR = params.get("_optR");
  const queryEdit = params.get("_edit");
  const queryApply = params.get("_optApply");
  const queryMy = params.get("_my");
  const queryProfile = params.get("_profile");
  const queryUEdit = params.get("_userEdit");
  const queryCalcSal = params.get("_calcSal");

  const { username } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const setHeader = (type) => {
    setDashboard(type);
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "leave":
        document.getElementById("header").innerHTML = "Leave Requests";
        break;
      case "details":
        document.getElementById("header").innerHTML = "Employee Details";
        break;
      case "add":
        document.getElementById("header").innerHTML = "Add Employee";
        break;
      case "history":
        document.getElementById("header").innerHTML = "Employee History";
        break;
      case "pwd":
        document.getElementById("header").innerHTML = "Password Reset Request";
        break;
      case "apply":
        document.getElementById("header").innerHTML = "Apply For Leave";
        break;
      case "profile":
        document.getElementById("header").innerHTML = "My Profile";
        break;
      case "calc_salary":
        document.getElementById("header").innerHTML = "Calculate Salary";
        break;

      default:
        break;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.setItem("authToken", null);
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    history("/");
  };

  const _displayWarning = () => (
    <Empty
      image={"https://i.ibb.co/r3jR052/warn.png"}
      description={"We are sorry. You are not authorized for this route"}
    />
  );

  const _getPermissionRoutes = () => {
    if (dashboard !== "dashboard") {
      switch (user?.type) {
        case "Admin":
          if (queryL === "leave") return <DisplayLeaves />;
          else if (queryApply === "true") return <LeaveRequest />;
          return _displayWarning();
        case "subject-officer":
          if (queryE === "employee") return <DisplayEmployees />;
          else if (queryA === "add") return <AddEmployee />;
          else if (queryH === "history") return <LeaveHistory />;
          else if (queryR === "request") return <PasswordResetRequest />;
          else if (queryEdit === "true") return <EditEmployee />;
          return _displayWarning();
        case "manager":
          if (queryCalcSal == 1) return <CalculateSalary />;
          return _displayWarning();
        case "user":
          if (queryProfile === "my") return <Profile />;
          else if (queryUEdit === "true") return <EditEmployee />;
          else if (queryMy === "view") return <Leaves />;
          return _displayWarning();
        default:
          return <></>;
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {collapsed === false ? (
          <div className="logo">
            <center>
              <img src={Logo} className="img" />
              <p
                onClick={() => {
                  history(
                    `/${
                      username === "subject-officer" || username === "Admin"
                        ? "subject-officer"
                        : username === "Manager"
                        ? "manager"
                        : "user"
                    }-dashboard/${user?.username}`
                  );
                  setHeader("dashboard");
                }}
                style={{ cursor: "pointer" }}
              >
                Ministry of Fisheries
              </p>
            </center>
          </div>
        ) : (
          <center>
            <HomeOutlined
              style={{ color: "white", marginTop: "50px", cursor: "pointer" }}
              onClick={() => {
                history(
                  `/${
                    username === "subject-officer" || username === "Admin"
                      ? "subject-officer"
                      : username === "Manager"
                      ? "manager"
                      : "user"
                  }-dashboard/${user?.username}`
                );
                setHeader("dashboard");
              }}
            />
          </center>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={
            queryL === "leave" || queryApply === "true" || queryCalcSal == 1
              ? ["0"]
              : queryE === "employee" ||
                queryEdit === "true" ||
                queryMy === "view"
              ? ["1"]
              : queryA === "add" ||
                queryProfile === "my" ||
                queryUEdit === "true"
              ? ["2"]
              : queryH === "history"
              ? ["3"]
              : queryR === "request"
              ? ["4"]
              : null
          }
        >
          {user?.type === "subject-officer" ? (
            <>
              {user?.username === "Admin" && (
                <Menu.Item
                  key="0"
                  icon={<PullRequestOutlined />}
                  onClick={() => {
                    setHeader("leave");
                    history(
                      `/subject-officer-dashboard/${user?.username}?_optL=leave`
                    );
                  }}
                >
                  Leave Requests
                </Menu.Item>
              )}
              {user?.username === "subject-officer" && (
                <>
                  {" "}
                  <Menu.Item
                    key="1"
                    icon={<AuditOutlined />}
                    onClick={() => {
                      setHeader("details");
                      history(
                        `/subject-officer-dashboard/${user?.username}?_optE=employee`
                      );
                    }}
                  >
                    Employee Details
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<UserAddOutlined />}
                    onClick={() => {
                      setHeader("add");
                      history(
                        `/subject-officer-dashboard/${user?.username}?_optA=add`
                      );
                    }}
                  >
                    Add Employee
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<HistoryOutlined />}
                    onClick={() => {
                      setHeader("history");
                      history(
                        `/subject-officer-dashboard/${user?.username}?_optH=history`
                      );
                    }}
                  >
                    Leave History
                  </Menu.Item>
                </>
              )}
              <Menu.Item
                key="4"
                icon={<SettingOutlined />}
                onClick={() => {
                  setHeader("pwd");
                  history(
                    `/subject-officer-dashboard/${user?.username}?_optR=request`
                  );
                }}
              >
                Password Reset Request
              </Menu.Item>
            </>
          ) : user?.type === "user" ? (
            <>
              <Menu.Item
                key="0"
                icon={<SendOutlined />}
                onClick={() => {
                  setHeader("apply");
                  history(`/user-dashboard/${user?.username}?_optApply=true`);
                }}
              >
                Apply For Leave
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={<CrownOutlined />}
                onClick={() => {
                  setHeader("my");
                  history(`/user-dashboard/${user?.username}?_my=view`);
                }}
              >
                My Leaves
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<ProfileOutlined />}
                onClick={() => {
                  setHeader("profile");
                  history(`/user-dashboard/${user?.username}?_profile=my`);
                }}
              >
                Profile
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                key={"0"}
                icon={<CalculatorOutlined />}
                onClick={() => {
                  setHeader("calc_salary");
                  history(`/manager-dashboard/${user?.username}?_calcSal=1`);
                }}
              >
                Calculate Salary
              </Menu.Item>
            </>
          )}
        </Menu>
        <br />
        <br />
        {collapsed === false ? (
          <center>
            <Button icon={<LogoutOutlined />} onClick={logoutHandler}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center>
            <LogoutOutlined
              style={{ color: "white" }}
              onClick={logoutHandler}
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1 id="header" style={{ fontFamily: "serif", fontSize: "20px" }}>
            {queryL === "leave"
              ? "Leave Requests"
              : queryE === "employee"
              ? "Employee Details"
              : queryEdit === "true"
              ? "Edit Employee Details"
              : queryA === "add"
              ? "Add Employee"
              : queryH === "history"
              ? "Leave History"
              : queryR === "request"
              ? "Password Reset Request"
              : queryApply === "true"
              ? "Apply For Leave"
              : queryMy === "view"
              ? "My Leaves"
              : queryProfile === "my"
              ? "My Profile"
              : queryUEdit === "true"
              ? "Edit Your Profile"
              : queryCalcSal == 1
              ? "Calculate Salary"
              : "Dashboard"}
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{user?.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/subject-officer-dashboard/${user?.username}` &&
            !queryL &&
            !queryE &&
            !queryA &&
            !queryH &&
            !queryR &&
            !queryEdit && <CarouselView />}
          {username !== "subject-officer" &&
            username !== "Admin" &&
            !queryApply &&
            !queryMy &&
            !queryProfile &&
            !queryUEdit &&
            !queryCalcSal && <CarouselView />}
          {_getPermissionRoutes()}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} Ministry of Fisheries
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
