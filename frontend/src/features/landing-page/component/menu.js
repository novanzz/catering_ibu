import React, { Component } from 'react';
import { Button } from 'antd';
import { fetchApi } from '../../../middleware/api'
import "../style.scss";

class MenuMasakan extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  async onLoadPage() {
    const fetch = await fetchApi("/products/");
    this.setState({
      data: fetch.data.product,
    });
  }

  //load to fetch data
  componentDidMount() {
    this.onLoadPage();
  }

  render() {
    const image = this.state.data.map((fetch, i) =>
      <div class="col-4 col-s-6 ">
        <div className="card">
          <img className = "zoom" src={"http://localhost:4000/" + fetch.productImage} style={{ width: "100%", height: "31vh" }}></img>
          <div className="container" >
            <h4><b>{fetch.name}</b></h4>
            <p>{fetch.itemFood}</p>
            <h4><b>Price</b></h4>
            <p>Rp {fetch.price}</p>
          </div>
        </div>
      </div>
    );

    return (
      <section>
        <div class="center">
          {image}
        </div>
        <div class="centerButton" >
          <Button
            block
            size="large"
          >
            Memuat
           </Button>
        </div >
      </section>
    );
  }
}

export default MenuMasakan;