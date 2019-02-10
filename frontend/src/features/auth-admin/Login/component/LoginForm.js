import React, { Component } from 'react';
import { Form, Icon, Input, Button, Modal, Card } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { setCookies } from "../../../../middleware/cookies-manager";
import { postApi } from '../../../../middleware/api';
import '../../style.scss'
import styled from 'styled-components'
const FormItem = Form.Item;

const FormLoginForgot = styled.a`
  float: Left;
`
const FormLoginButton = styled(Button)`
  float: right;
`
const Title = styled.h1`
  text-align :center;
`

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onChangeLogin(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  errLogin() {
    Modal.error({
      title: 'Fail Login',
      content: 'Wrong username and password'
    })
  }

  //action
  async onClickLogin() {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await postApi("/users/login", this.state);
        if (res.status === 200) {
          await setCookies(res.data.token)
          return this.props.history.push("/Menu");
        } else {
          return this.errLogin()
        }
      }
    });
  }

  render() {
    console.log(this.props.form)
    const { getFieldDecorator } = this.props.form;

    return (
        <Form className="form" onSubmit={this.handleSubmit}>
          <Card className="card">
            <Title>Login</Title>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true, message: 'Please input your email!'
                  },
                  {
                    type: 'email', message: 'The input is not valid E-mail!',
                  }
                ],
              })(
                <Input
                  id="email"
                  prefix={
                    <Icon
                      type="user"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder="Email"
                  onChange={event => this.onChangeLogin(event)}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ],
              })(
                <Input.Password
                  id="password"
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                    />
                  }
                  placeholder="Password"
                  onChange={this.onChangeLogin}
                />
              )}
            </FormItem>
            <FormItem>
              <FormLoginForgot
                href="/login">Forgot password ?
            </FormLoginForgot>
            </FormItem>
            <FormItem>
              <FormLoginButton
                type="primary"
                htmlType="submit"
                onClick={this.onClickLogin}
              >Log in
                  </FormLoginButton>
              <Link
                to="/register">
                <a>Register</a>
              </Link>
            </FormItem>
          </Card>
        </Form>
    );
  };
};

export default withRouter(Form.create()(LoginForm));