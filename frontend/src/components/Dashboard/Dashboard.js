import { useEffect, useState } from "react";
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
  TableOutlined,
  PercentageOutlined,
  FileSyncOutlined,
  UploadOutlined,
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
import Profile from "./DashboardSubComponents/user/Profile";
import Leaves from "./DashboardSubComponents/user/Leaves";
import LeaveHistory from "./DashboardSubComponents/LeaveHistory";
import CalculateSalary from "./DashboardSubComponents/manager/CalculateSalary";
import MasterSalary from "./DashboardSubComponents/manager/MasterSalary";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authActions";
import Promotions from "./DashboardSubComponents/manager/Promotions";
import UnOfficialEmps from "./DashboardSubComponents/UnOfficialEmps";
import SubmitDocs from "./DashboardSubComponents/SubmitDocs";
import Directory from "./DashboardSubComponents/Directory";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ user = null }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const loggedUser = { ...user };
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
  const queryMasterTable = params.get("_salTable");
  const queryPromo = params.get("_promo");
  const queryUn = params.get("un");
  const queryDoc = params.get("doc");
  const queryDir = params.get("dir");

  const { username } = useParams();

  const date = new Date();
  const hrs = date.getHours();

  const dispatch = useDispatch();

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
      case "masterTable":
        document.getElementById("header").innerHTML = "Master Salary Table";
        break;
      case "promo":
        document.getElementById("header").innerHTML = "Promotions";
        break;
      case "un":
        document.getElementById("header").innerHTML = "UnOfficial Employees";
        break;
      case "doc":
        document.getElementById("header").innerHTML = "Submit Document";
        break;
      case "dir":
        document.getElementById("header").innerHTML = "Directory";
        break;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
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
      switch (loggedUser?.type) {
        case "subject-officer":
          if (loggedUser?.username === "Admin") {
            if (queryL === "leave") return <DisplayLeaves />;
            else if (queryR === "request") return <PasswordResetRequest />;
            else if (queryUn === "un") return <UnOfficialEmps />;
            else if (queryDoc === "doc") return <SubmitDocs />;
            else if (queryDir === "dir") return <Directory />;
            else if (dashboard) return _displayWarning();
          } else if (queryE === "employee") return <DisplayEmployees />;
          else if (queryA === "add") return <AddEmployee />;
          else if (queryR === "request") return <PasswordResetRequest />;
          else if (queryH === "history") return <LeaveHistory />;
          else if (queryEdit === "true") return <EditEmployee />;
          else if (dashboard) return _displayWarning();
        case "manager":
          if (queryCalcSal == 1) return <CalculateSalary />;
          else if (queryMasterTable == 1) return <MasterSalary />;
          else if (queryPromo == 1) return <Promotions />;
          else if (dashboard) return _displayWarning();
        case "user":
          if (queryProfile === "my") return <Profile />;
          else if (queryApply === "true") return <LeaveRequest />;
          else if (queryUEdit === "true") return <EditEmployee />;
          else if (queryMy === "view") return <Leaves />;
          else if (dashboard) return _displayWarning();
        default:
          return <></>;
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
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
                    }-dashboard/${loggedUser?.username}`
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
                  }-dashboard/${loggedUser?.username}`
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
                queryMy === "view" ||
                queryMasterTable == 1 ||
                queryUn === "un"
              ? ["1"]
              : queryA === "add" ||
                queryProfile === "my" ||
                queryUEdit === "true" ||
                queryPromo == 1 ||
                queryDoc === "doc"
              ? ["2"]
              : queryH === "history" || queryDir === "dir"
              ? ["3"]
              : queryR === "request"
              ? ["4"]
              : null
          }
        >
          {loggedUser?.type === "subject-officer" ? (
            <>
              {loggedUser?.username === "Admin" && (
                <>
                  {" "}
                  <Menu.Item
                    key="0"
                    icon={<FileSyncOutlined />}
                    onClick={() => {
                      setHeader("leave");
                      history(
                        `/subject-officer-dashboard/${loggedUser?.username}?_optL=leave`
                      );
                    }}
                  >
                    Leave Requests
                  </Menu.Item>
                  <Menu.Item
                    key="1"
                    icon={<UserAddOutlined />}
                    onClick={() => {
                      setHeader("un");
                      history(
                        `/subject-officer-dashboard/${loggedUser?.username}?un=un`
                      );
                    }}
                  >
                    Unofficial Employees
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<UploadOutlined />}
                    onClick={() => {
                      setHeader("doc");
                      history(
                        `/subject-officer-dashboard/${loggedUser?.username}?doc=doc`
                      );
                    }}
                  >
                    Submit Documents
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<AuditOutlined />}
                    onClick={() => {
                      setHeader("dir");
                      history(
                        `/subject-officer-dashboard/${loggedUser?.username}?dir=dir`
                      );
                    }}
                  >
                    Directory
                  </Menu.Item>
                </>
              )}
              {loggedUser?.username === "subject-officer" && (
                <>
                  {" "}
                  <Menu.Item
                    key="1"
                    icon={<AuditOutlined />}
                    onClick={() => {
                      setHeader("details");
                      history(
                        `/subject-officer-dashboard/${loggedUser?.username}?_optE=employee`
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
                        `/subject-officer-dashboard/${loggedUser?.username}?_optA=add`
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
                        `/subject-officer-dashboard/${loggedUser?.username}?_optH=history`
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
                    `/subject-officer-dashboard/${loggedUser?.username}?_optR=request`
                  );
                }}
              >
                Password Reset Request
              </Menu.Item>
            </>
          ) : loggedUser?.type === "user" ? (
            <>
              <Menu.Item
                key="0"
                icon={<SendOutlined />}
                onClick={() => {
                  setHeader("apply");
                  history(
                    `/user-dashboard/${loggedUser?.username}?_optApply=true`
                  );
                }}
              >
                Apply For Leave
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={<CrownOutlined />}
                onClick={() => {
                  setHeader("my");
                  history(`/user-dashboard/${loggedUser?.username}?_my=view`);
                }}
              >
                My Leaves
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<ProfileOutlined />}
                onClick={() => {
                  setHeader("profile");
                  history(
                    `/user-dashboard/${loggedUser?.username}?_profile=my`
                  );
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
                  history(
                    `/manager-dashboard/${loggedUser?.username}?_calcSal=1`
                  );
                }}
              >
                Calculate Salary
              </Menu.Item>
              <Menu.Item
                key={"1"}
                icon={<TableOutlined />}
                onClick={() => {
                  setHeader("masterTable");
                  history(
                    `/manager-dashboard/${loggedUser?.username}?_salTable=1`
                  );
                }}
              >
                Master Salary Table
              </Menu.Item>
              <Menu.Item
                key={"2"}
                icon={<PercentageOutlined />}
                onClick={() => {
                  setHeader("promo");
                  history(
                    `/manager-dashboard/${loggedUser?.username}?_promo=1`
                  );
                }}
              >
                Promotions
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
              : queryMasterTable == 1
              ? "Master Salary Table"
              : queryPromo == 1
              ? "Promotions"
              : queryUn === "un"
              ? "Unofficial Employees"
              : queryDir === "dir"
              ? "Directory"
              : queryDoc === "doc"
              ? "Submit Documents"
              : "Dashboard"}
          </h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>{loggedUser?.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/subject-officer-dashboard/${loggedUser?.username}` &&
            !queryL &&
            !queryE &&
            !queryA &&
            !queryH &&
            !queryR &&
            !queryEdit &&
            !queryUn &&
            !queryDir &&
            !queryDoc && <CarouselView />}
          {username !== "subject-officer" &&
            username !== "Admin" &&
            !queryApply &&
            !queryMy &&
            !queryProfile &&
            !queryUEdit &&
            !queryCalcSal &&
            !queryMasterTable &&
            !queryPromo && <CarouselView />}
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
