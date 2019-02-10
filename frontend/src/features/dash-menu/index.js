import React, { Component } from "react";
import { Layout } from 'antd';
import Menus from "./component/menu";

class Menu extends Component {
  render() {
    return (
      <Layout>
        <h1>Menu</h1>
        <Menus></Menus>
      </Layout>

    );
  }
}

export default (Menu);