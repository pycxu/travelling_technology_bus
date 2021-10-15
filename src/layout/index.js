import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import { Component } from 'react';

const { Header, Content, Footer } = Layout;

export default class SiderDemo extends Component {
    state = {
      
    };
  
  
    render() {
      return (
          <Layout>
            <Header style={{ background: '#fff', position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">🚍 Travelling Technology Bus</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/register">Register</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/admin">Admin</Link></Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '50px 50px 50px 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ minHeight: 560 }}>
                    {this.props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>SWEN90016 ©2021 Created by T09_05</Footer>
        </Layout>
        
      );
    }
}