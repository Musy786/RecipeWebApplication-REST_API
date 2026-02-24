import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import RecipesPage from "./pages/RecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import "./App.css"; 

const {Header, Content} = Layout;
const {Title} = Typography;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Recipes</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/create">Create Recipe</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: "0 50px"}}>
          <div className="site-layout-content" style={{padding: "24px", minHeight: "380px"}}>
            <Title level={2} style={{textAlign: "center", marginBottom: "20px"}}>Recipe Management</Title>
            <Routes>
              <Route path="/" element={<RecipesPage />} />
              <Route path="/create" element={<CreateRecipePage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;