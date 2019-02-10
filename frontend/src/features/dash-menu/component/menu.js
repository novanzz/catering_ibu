import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { fetchApi, postApi, deleteApi, updateApi } from '../../../middleware/api'
import FormPost from './formPost'
import { Table, Input, Button, Icon, Layout, Divider, Switch, message } from 'antd'
import styled from 'styled-components'

const Layouts = styled(Layout)`
  padding: 20px;
  background-color: #fff;
`
const Tables = styled(Table)`
  padding-top : 10px;
  background-color: #fff;
`
const Btn = styled.div`
  text-align : right;
`
const Image = styled.img`
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px;  /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px; /* Set a small width */
`

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      data: [],
      id:'',
      dataId:''
    }
    this.onLoadPage = this.onLoadPage.bind(this);
  }

  //fetch data from backend
  async onLoadPage() {
    const fetch = await fetchApi("/products/");
    this.setState({
      data: fetch.data.product
    });
  }

  async onUpdate(id) {
    // console.log(id)
    const fetchId = await fetchApi("/products/"+id);
    this.setState({
      id: id,
      visible: true,
      dataId: fetchId.data.product
    })
    console.log(this.state.id)
  }

  async onDelete(id) {
    console.log(id)
    const fetch = await deleteApi("/products/"+id);
    this.onLoadPage();
  }
  
  //load to fetch data
  componentDidMount() {
    this.onLoadPage();
  }
 
  //always update
  componentWillUpdate(){
    // this.onLoadPage();
  }

  //seacrch data table
  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  //research data table
  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  // modal
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  //post data to product (not finish)
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const formData = new FormData();
      if(this.state.id === ''){
        //can take data with this code
        formData.append('productImage', values.productImage.file);
        formData.append('name', values.name);
        formData.append('itemFood', values.itemFood);
        formData.append('price', values.price);
        const res = await postApi("/products/", formData);
        if (res.status === 200) {
          message.success(`file sukses di upload`);
          this.onLoadPage();
        } else {
          message.error(`file gagal di upload`);
        }
      }else{
        formData.append('productImage', values.productImage.file);
        formData.append('name', values.name);
        formData.append('itemFood', values.itemFood);
        formData.append('price', values.price);
        const res = await updateApi("/products/"+this.state.id,formData
      );
        if (res.status === 200) {
          message.success(`file sukses di upload`);
          
          this.onLoadPage();
        } else {
          message.error(`file gagal di upload`);
        }
      }
      form.resetFields();
      this.setState({ visible: false });
      return this.props.history.push("/Menu");
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    //definition dara from backend
    const data = this.state.data.map((fetch, i) => {
      const obj = {
        key: i,
        name: fetch.name,
        price: fetch.price,
        photo: "http://localhost:4000/" + fetch.productImage,
        foodItem: fetch.itemFood,
        available: '',
        id: fetch._id
      }
      return obj;
    });

    //definition table columns, data foto masih manual
    const columns = [{
      title: 'Foto',
      dataIndex: 'photo',
      key: 'photo',
      render: (text) => (
        <Image src={text}>
        </Image>
      )
    }, {
      title: 'Nama Paket',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={this.handleSearch(selectedKeys, confirm)}
          />
          <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
          <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="smile-o" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            this.searchInput.focus();
          });
        }
      },
      render: (text) => {
        const { searchText } = this.state;
        return searchText ? (
          <span>
            {text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((fragment, i) => (
              fragment.toLowerCase() === searchText.toLowerCase()
                ? <span key={i} className="highlight">{fragment}</span> : fragment // eslint-disable-line
            ))}
          </span>
        ) : text;
      },
    }, {
      title: 'Item Makanan',
      dataIndex: 'foodItem',
      key: 'foodItem',
    }, {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    }, {
      title: 'Ketersediaan',
      dataIndex: 'available',
      key: 'available',
      render: () => (
        <span style={{ marginLeft: 20 }}>
          <Switch defaultChecked />
        </span>
      )
    }, {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <span>
          <a onClick={()=>this.onUpdate(id)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={()=>this.onDelete(id)}>Hapus</a>
        </span>
      )
    }
    ];

    return (
      <Layouts>
        <Btn>
            <Button type="primary" onClick={this.showModal}>Tambah menu</Button>
        </Btn>
        <Tables
          pagination={{ pageSize: 5 }}
          // bordered={true}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
        >
        </Tables>
        <FormPost
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Layouts>
    );
  }
}

export default withRouter(Menu);