import React, { Component } from 'react';
import Form from "./component/LoginForm";
import { Layout } from 'antd';
import '../style.scss';

class Login extends Component {
  render() {
    return (
      <Layout className="layout">
        <Form></Form>
      </Layout>

    );
  };
}

export default Login;