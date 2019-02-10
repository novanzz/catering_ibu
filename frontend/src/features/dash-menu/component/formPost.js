import React, { Component } from "react"
import { Button, Modal, Form, Input, InputNumber, Upload, Icon } from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;

class FormPost extends Component {
  
  state = {
    fileList: [],
  }

  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.slice(-1);
    this.setState({ fileList });
  }
  
  render() {
    //upload foto
    const { fileList } = this.state;
    const props = {
      onChange: this.handleChange,
      multiple: false,
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    //modal
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Tambah Menu"
        okText="Tambahkan"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Nama Paket">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Form nama paket tidak boleh kosong!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Item makanan">
            {getFieldDecorator('itemFood', {
              rules: [{ required: true, message: 'Form item makanan tidak boleh kosong!' }],
            })(
              <TextArea />
            )}
          </FormItem>
          <FormItem label="Harga">
            {getFieldDecorator('price', {
              rules: [{ required: true, message: 'Form harga tidak boleh kosong!' }],
            })(
              <InputNumber
                defaultValue={10000}
                min={0}
                step='500'
                formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\Rp\s?|(,*)/g, '')}
              // onChange={onChange}
              />
            )}
          </FormItem>
          <FormItem label="Foto makanan">
            {getFieldDecorator('productImage', {
              rules: [{ required: true, message: 'Form foto makanan tidak boleh kosong!' }],
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Upload
              </Button>
              </Upload>
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

export default Form.create()(FormPost)