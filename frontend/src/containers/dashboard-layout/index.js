import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { Layout, BackTop } from 'antd';

import routes from '../../routes';

import Header from './header';
import Footer from "./footer";
import Sider from "./sider";

const { Content } = Layout;

class DashAdmin extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isCollapse: false,
    }

    this.handleCollapse = this.handleCollapse.bind(this);

  }

  handleCollapse(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider handleCollapse={this.handleCollapse} />
          <Layout>
            <Header></Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ marginBottom: 100 }}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                  )}
                </Switch>
              </div>
              <BackTop />
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>

      </div>
    );
  }
}

export default DashAdmin;