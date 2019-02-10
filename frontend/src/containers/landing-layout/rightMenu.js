import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
class RightMenu extends Component {
    render() {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="mail">
                    <Link
                        to="/login">
                        <a>Login</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="app">
                    <Link
                        to="/register">
                        <a>Signup</a>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default RightMenu;