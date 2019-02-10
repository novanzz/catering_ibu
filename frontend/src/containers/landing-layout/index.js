import React, { Component } from "react";
import { Layout, BackTop } from 'antd';

import Header from './header';
import Footer from "../dashboard-layout/footer";
import Contents from '../../features/landing-page/index'


class landngcontainer extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Header></Header>
          <Contents></Contents>
            <BackTop />
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}

export default (landngcontainer);