import React, { Component } from 'react';
import { Layout, Button, Menu, Dropdown, Icon, Row, Col } from 'antd'
import styled from "styled-components"
import { withRouter } from "react-router-dom";
import { delCookies } from '../../middleware/cookies-manager'

const { Header } = Layout;

const Buttons = styled(Button)`
 float : right;
 padding-top : 10px;
 padding-bottom : 30px
 margin-top : 10px;
 margin-bottom : 20px;
 margin-right : 20px;
`
const Font = styled.h1`
 margin-left : 20px;
`

class headerLayout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

  }
  async handleLogout() {
    await delCookies();
    return this.props.history.push("/login");
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const { location: { pathname } } = this.props;
    const { name } = this.props;
    console.log(pathname)

    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="1">Logout</Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div>
          <Dropdown overlay={menu} placement="bottomRight" >
            <Buttons>
              Account
            </Buttons>
          </Dropdown>
          {/* <Font>{pathname.substring(1)}</Font> */}
        </div>
      </Header>
    );
  }
}

export default withRouter(headerLayout);