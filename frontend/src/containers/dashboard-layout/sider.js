import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Layout, Menu, Icon, Divider } from 'antd'
import styled from "styled-components"

import {items} from "../../nav"

const { Sider } = Layout;

const Logo = styled.div`
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
`
const Menus = styled(Menu)`
  padding : 10px
`


class SiderLayout extends Component {

  render() {
    const {handleCollapse} = this.props;
    console.log('collapse sider',handleCollapse)
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width="250"
        onCollapse={(collapsed, type) => { handleCollapse(collapsed) }}
      >
        <Logo />
        <Divider />
        <Menus theme="dark" mode="inline" defaultSelectedKeys={'0'}>
          {items.map((text, index) => (
            <Menu.Item key={text.key}>
              <Link to={text.url}>
                <Icon type={text.icon} />
                <span className="nav-text">{text.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menus>
      </Sider>
    );
  }
}

export default (SiderLayout);