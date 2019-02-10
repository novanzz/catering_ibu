import React, { Component } from "react";
import { Layout } from 'antd';
import Order from './component/orderan'

class Orderan extends Component {
  render() {
    return (
      <Layout>
        <h1>Order</h1>
        <Order></Order>
      </Layout>
    );
  }
}

export default Orderan;