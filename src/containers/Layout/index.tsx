import React, { ReactNode, useState } from "react";

import WrapLayout from "./styles";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { FaRegUser, FaShippingFast } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { GiFactory } from "react-icons/gi";
import { BsLaptop } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

interface Props {
  children: ReactNode;
}

const { Header, Content, Sider } = Layout;

// eslint-disable-next-line
export default function LayoutCommon({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  return (
    <WrapLayout>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            borderRight: "2px solid #eee",
            background: "white",
          }}
          width={"230px"}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="wrap_logo">
            <div className="logo">
              <Link to="/">
                <RiAdminLine size={30} color={"#1990FF"} />
              </Link>
            </div>
          </div>

          <Menu
            theme={"light"}
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }: { key: any }) => {
              if (key === "1") {
                history.push("/");
              } else if (key === "2") {
                history.push("/");
              } else if (key === "3") {
                history.push("/");
              } else if (key === "4") {
                history.push("/");
              } else if (key === "5") {
                history.push("/");
              } else if (key === "6") {
                history.push("/statistic");
              }
            }}
            items={[
              {
                key: "1",
                icon: <GiFactory />,
                label: "Quản lý",
              },
              {
                key: "2",
                icon: <MdBorderColor />,
                label: "Quản lý",
              },
              {
                key: "3",
                icon: <FaRegUser />,
                label: "Quản lý",
              },
              {
                key: "4",
                icon: <BsLaptop />,
                label: "Quản lý",
              },
              {
                key: "5",
                icon: <FaShippingFast />,
                label: "Quản lý",
              },
              {
                key: "6",
                icon: <AiOutlineBarChart />,
                label: "Thống kế",
              },
            ]}
          />
        </Sider>

        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 80 : 230 }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              background: "white",
              borderBottom: "2px solid #eee",
            }}
          >
            <div className="wrap_header">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}

              <div className="header_handle">
                <div className="search"></div>

                <div className="handle_right">
                  <div className="handle_right_item">
                    <div className="icon">
                      <UserOutlined
                        style={{ fontSize: "18px", color: "#1890ff" }}
                      />
                    </div>
                    <div className="icon_hover">
                      <p
                        onClick={() => {
                          localStorage.removeItem("tokenAdmin");
                          localStorage.removeItem("usernameLapAdmin");
                          history.push("/login");
                        }}
                      >
                        Log out
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
              background: "#fbfcfe",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </WrapLayout>
  );
}
