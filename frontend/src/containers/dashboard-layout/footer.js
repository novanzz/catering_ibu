import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components'
import '../style.scss'
const { Footer } = Layout;

const Footers = styled(Footer)`
  padding-top: 30px;
  padding-bottom: 25px;
  width: 100%;
  background-color: #fff;
  color: #5D5D5D;
  text-align: center;
`

class footerLayout extends Component {
  render() {
    return (
      <Footers clasName="footer">
        <span>Cathering Ibu &copy; 2019</span>
        <span >Powered by Novan Ramadhan</span>
      </Footers>
    );
  }
}

export default (footerLayout);