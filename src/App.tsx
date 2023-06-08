import React, { useState } from "react";
import "./App.css";
import PremiumSubmission from "./containers/PremiumSubmission";

import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { MoneyCollectOutlined, UserOutlined } from "@ant-design/icons";
import UsersTable from "./containers/UsersTable";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [tab, setTab] = useState("users");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}></Header>
        <Content style={{ padding: "0 50px", height: "93vh" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                selectedKeys={[tab]}
                style={{ height: "100%" }}
                onSelect={(e) => setTab(e.key)}
                items={[
                  {
                    icon: <UserOutlined />,
                    key: "users",
                    label: "Users",
                  },
                  {
                    icon: <MoneyCollectOutlined />,
                    key: "premiums",
                    label: "Premium submissions",
                  },
                ]}
              />
            </Sider>
            <Content
              style={{ padding: "0 24px", minHeight: 280, height: "80vh" }}
            >
              {tab === "users" && <UsersTable />}
              {tab === "premiums" && <PremiumSubmission />}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
