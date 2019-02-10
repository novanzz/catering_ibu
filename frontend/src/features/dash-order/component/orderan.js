import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import moment from 'moment'
import { fetchApi, deleteApi } from '../../../middleware/api';

class Orderan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
    this.onLoadPage = this.onLoadPage.bind(this)
  }

  async onLoadPage() {
    const fetch = await fetchApi("/orders/");
    this.setState({
      data: fetch.data.Order
    })
    console.log('data', this.state.data)
  }

  async onDelete(id) {
    await deleteApi("/orders/" + id);
    this.onLoadPage();
  }

  componentDidMount() {
    this.onLoadPage();
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
  render() {
    const columns = [
      {
        title: 'Tanggal Memesan',
        width: 120,
        dataIndex: 'tglMemesan',
        key: 'memesan',
        fixed: 'left',
        sorter: (a, b) => { 
          return moment(a.tglMemesan || 0).unix() - moment(b.tglMemesan || 0).unix() 
        }
      },
      {
        title: 'Pembeli',
        width: 150,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
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
      },
      {
        title: 'Tanggal Pesan',
        width: 100,
        dataIndex: 'tglPesan',
        key: '1',
        sorter: (a, b) => { 
          return moment(a.tglPesan || 0).unix() - moment(b.tglPesan || 0).unix() 
        }
      },
      {
        title: 'Email', dataIndex: 'email', key: '2', width: 150,
      },
      {
        title: 'No-Telp', dataIndex: 'telp', key: '3', width: 150,
      },
      {
        title: 'Menu', dataIndex: 'product', key: '4', width: 90,
      },
      {
        title: 'Catatan', dataIndex: 'catatan', key: '5', width: 250,
      },
      {
        title: 'Alamat', dataIndex: 'alamat', key: '6', width: 250,
      },
      {
        title: 'Action',
        key: '7',
        dataIndex: "id",
        fixed: 'right',
        width: 100,
        render: (id) =>
          <a onClick={() => this.onDelete(id)}>Selesai</a>,
      },
    ];

    const data = this.state.data.map((fetch, i) => {
      const obj = {
        key: i,
        id: fetch._id,
        name: fetch.nama,
        email: fetch.email,
        telp: fetch.telp,
        catatan: fetch.catatan,
        alamat: fetch.alamat,
        product: fetch.product.name,
        tglPesan: moment(fetch.tglPesanan).format('l'),
        tglMemesan: moment(fetch.tglMemesan).format('l'),
      }
      return obj
    })

    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1500, y: 300 }}
        >
        </Table>
      </div>
    )
  }
}

export default Orderan