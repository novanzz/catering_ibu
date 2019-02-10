import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Card, Modal } from 'antd';
import { setCookies } from "../../../../middleware/cookies-manager";
import { postApi } from '../../../../middleware/api'
import styled from 'styled-components';
import '../../style.scss';
const FormItem = Form.Item;

const FormRegistButton = styled(Button)`
  float: right;
`
const Title = styled.h1`
  text-align :center;
`

class RegistForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
    this.onChangeRegist = this.onChangeRegist.bind(this);
    this.onClickRegist = this.onClickRegist.bind(this);
  }

  onChangeRegist(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  errLogin() {
    Modal.error({
      title: 'Fail Register',
      content: 'Email sudah digunakan'
    })
  }

  async onClickRegist() {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await postApi("/users/signup", this.state);
        if (res.status === 200) {
          await setCookies(res.data.token)
          return this.props.history.push("/login");
        } else if (res.status === 403) {
          return this.errLogin()
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
        <Form className="form" onSubmit={this.handleSubmit}>
          <Card className="card"
           {...formItemLayout}>
            <Title>Register</Title>
            <FormItem
              label="E-mail">
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
                  onChange={event => this.onChangeRegist(event)}
                />
              )}
            </FormItem>
            <FormItem
              label="Password">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ],
              })(
                <Input.Password
                  id="password"
                  onChange={this.onChangeRegist}
                />
              )}
            </FormItem>
            <FormItem
              label="Confirm password">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true, message: 'Please confirm your Password!'
                  },
                  {
                    validator: this.compareToFirstPassword,
                  }
                ],
              })(
                <Input.Password
                  id="confirm"
                  onBlur={this.onHandleConfirmBlur}
                />
              )}
            </FormItem>
            <br></br>
            <FormItem>
              <Link
                to="/login">
                <a style={{ marginLeft: 10 }}>Log in</a>
              </Link>
              <FormRegistButton
                type="primary"
                onClick={this.onClickRegist}
              >Create Account
                    </FormRegistButton>
            </FormItem>
          </Card>
        </Form>
    );
  }
}

export default withRouter(Form.create()(RegistForm));