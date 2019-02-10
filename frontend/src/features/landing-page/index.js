import React, { Component } from 'react';
import { Button, Carousel, Menu,Layout } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './style.scss';
import MenuMasakan from './component/menu';
import Order from './component/order'

const Carousels = styled(Carousel)`
  h1 {
    font-size: 50px;
    font-weight: bold;
    color : white;
  }
  h2 {
    color : white;
  }
`
class LandingPage extends Component {
  render() {
    return (
      <div>
        <Carousels autoplay>
          <div className="carousel">
            <div className="bg-text-crsl">
              <h1>
                Catering Ibu
                </h1>
              <h2>Nikmati pengalaman catering terenak dengan varian masakan berbeda</h2>
              <h2>dan juga harga yang kompetitif</h2>
              <br />
              <Button type="primary">Pesan Sekarang</Button>
            </div>
          </div>
          <div className="carousel1">
            <div className="bg-text-crsl">
              <h1>
                Varian Menu
                  </h1>
              <h2>Memiliki varian masakan dari mulai masakan sederhana hingga mewah</h2>
              <h2>masakan pedesaan hingga masakan luar negri </h2>
              <br />
              <Button type="primary">Lihat Menu</Button>
            </div>
          </div>
          <div className="carousel2">
            <div className="bg-text-crsl">
              <h1>
                Harga Kompetitif
                  </h1>
              <h2>Harga yang disajikan bervarian, dari mulai harga rendah hingga tinggi</h2>
              <h2>tergantung pilihan menu pesanan customer</h2>
              <Button type="primary">Lihat Harga</Button>
            </div>
          </div>
        </Carousels>
        <section className="section1">
          <h1>Anda Pesan Kami Antar</h1>
          <h4>Gratis ongkos kirim, kita akan antar pesanan untuk daerah jakarta dengan sekala minimal 50 box</h4>
          <h4>hanya dengan memesan via website dan kami akan mengkonfirmasi pesanan via whatsApp atau email</h4>
          <h4>hal ini akan mempermudah anda dalam proses pemesanan catering</h4>
        </section>
        <section className="menuAndalan">
          <div class="split left bg-text">
            <h1>Anda Pesan Kami Antar</h1>
            <h4>Gratis ongkos kirim, kita akan antar pesanan untuk daerah jakarta dengan sekala minimal 50 box</h4>
            <h4>hanya dengan memesan via website dan kami akan mengkonfirmasi pesanan via whatsApp atau email</h4>
            <h4>hal ini akan mempermudah anda dalam proses pemesanan catering</h4>
            <br></br>
            <Button ghost>Pesan Sekarang</Button>
          </div>
          <div class="split right"></div>
        </section>
        <section className="menuAndalan1">
          <div class="split left1"></div>
          <div class="split right1 bg-text">
            <h1>Anda Pesan Kami Antar</h1>
            <h4>Gratis ongkos kirim, kita akan antar pesanan untuk daerah jakarta dengan sekala minimal 50 box</h4>
            <h4>hanya dengan memesan via website dan kami akan mengkonfirmasi pesanan via whatsApp atau email</h4>
            <h4>hal ini akan mempermudah anda dalam proses pemesanan catering</h4>
            <br></br>
            <Button type="primary" ghost>Pesan Sekarang</Button></div>
        </section>
        <div className="txtMenu">
          <h1>Menu Masakan</h1>
        </div>
        <MenuMasakan></MenuMasakan>
        <Order></Order>

      </div >
    );
  }
}

export default withRouter(LandingPage);