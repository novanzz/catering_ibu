import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Modal, Card, Select, DatePicker } from 'antd';
import moment from 'moment';

import { fetchApi, postApi } from '../../../middleware/api'
import '../style.scss';
import styled from 'styled-components';

const FormItem = Form.Item;
const Option = Select.Option;

const FormLoginButton = styled(Button)`
  width: 38vw;
  margin-left: 11%;
`
const Title = styled.h1`
  text-align :center;
`

class Order extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      data: [],
    };
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);
    this.onChangeMenu = this.onChangeMenu.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  async onLoadPage() {
    const fetch = await fetchApi("/products/");
    this.setState({
      data: fetch.data.product
    })
  }

  componentDidMount() {
    this.onLoadPage();
  }

  onChangeLogin(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  onChangeMenu(event) {
    this.setState({
      productId: event
    });
  }

  onChangeDate(e) {
    this.setState({
      tglPesanan: e._d,
      tglMemesan: new Date(),
    });
  }

  errPost() {
    Modal.error({
      title: 'Gagal Semesan',
      content: 'Anda gagal memesan silahkan coba lagi'
    })
  }

  succesPost() {
    Modal.success({
      title: 'Pesanan berhasil',
      content: 'Pesanan anda akan di konfirmasi terlebih dahulu melalui email atau telepon'
    },
      this.props.history.push("/")
    )
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstNumber = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('telp')) {
      callback('number telephone that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  // action
  async onClick() {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await postApi("/orders/", this.state);
        console.log(this.state)
        if (res.status === 200) {
          return this.succesPost();
        } else {
          return this.errPost();
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
        sm: { span: 17 },
      },
    };

    const product = this.state.data.map((fetch, i) =>
      <Option value={fetch._id}>{fetch.name}</Option>
    );

    return (
      <section style={{ background: "#666666", padding: 40 }}>
        <Form if="formOrder" className="formCard" onSubmit={this.handleSubmit}>
          <Card>
            <Title>Pesanan</Title>
            <FormItem style={{ paddingTop: 10 }}
              label="Nama"
              {...formItemLayout}
            >
              {getFieldDecorator('nama', {
                rules: [
                  {
                    required: true, message: 'Please input your name!'
                  },
                ],
              })(
                <Input
                  id="email"
                  onChange={event => this.onChangeLogin(event)}
                />
              )}
            </FormItem>
            <FormItem
              label="E-mail"
              {...formItemLayout}>
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
                  onChange={event => this.onChangeLogin(event)}
                />
              )}
            </FormItem>
            <FormItem
              label="No-Telp"
              {...formItemLayout}>
              {getFieldDecorator('telp', {
                rules: [
                  {
                    required: true, message: 'Please input your number telephone!'
                  },
                ],
              })(
                <Input
                  id="telp"
                  placeholder="+62"
                  onChange={event => this.onChangeLogin(event)}
                />
              )}
            </FormItem>
            <FormItem
              label="Konfirmasi-telp"
              {...formItemLayout}>
              {getFieldDecorator('Confirm-telp', {
                rules: [
                  {
                    required: true, message: 'Please input your number telephone!'
                  }, {
                    validator: this.compareToFirstNumber
                  }
                ],
              })(
                <Input
                  id="konfirm-telp"
                  placeholder="+62"
                  onChange={this.handleConfirmBlur}
                />
              )}
            </FormItem>
            <FormItem
              label="Menu"
              {...formItemLayout}>
              {getFieldDecorator('product', {
                rules: [
                  {
                    required: true, message: 'Please input your menu!'
                  },
                ],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a menu"
                  onChange={this.onChangeMenu}
                >
                  {product}
                </Select>,
              )}
            </FormItem>
            <FormItem
              label="Tanggal Pesanan"
              {...formItemLayout}
            >
              {getFieldDecorator('tglPesanan', {
                rules: [
                  {
                    required: true, message: 'Please input your date!'
                  },
                ],
              })(
                <DatePicker
                  defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                  onChange={this.onChangeDate}
                />
              )}
            </FormItem>

            <FormItem
              label="Catatan"
              {...formItemLayout}>
              <Input.TextArea
                id="catatan"
                rows={4}
                onChange={event => this.onChangeLogin(event)}
              />
            </FormItem>
            <FormItem
              label="Alamat"
              {...formItemLayout}>
              {getFieldDecorator('alamat', {
                rules: [
                  {
                    required: true, message: 'Please input your address!'
                  },
                ],
              })(
                <Input.TextArea
                  rows={4}
                  id="alamat"
                  onChange={event => this.onChangeLogin(event)}
                />
              )}
            </FormItem>

            <FormItem>
              <FormLoginButton
                type="primary"
                htmlType="submit"
                onClick={this.onClick}
              >Order
              </FormLoginButton>
            </FormItem>
          </Card>
        </Form>
      </section>
    );

  }
}

export default withRouter(Form.create()(Order));