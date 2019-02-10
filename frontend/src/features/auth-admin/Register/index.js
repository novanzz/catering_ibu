import React, { Component } from "react";
import { Layout } from "antd";
import '../style.scss';
import RegistForm from '../Register/component/RegisterForm';

class RegisterPage extends Component {
    render() {
        return (
            <Layout className="layout">
                <RegistForm></RegistForm>
            </Layout>

        );
    }
}

export default RegisterPage;