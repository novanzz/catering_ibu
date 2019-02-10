import React, { Component } from 'react';
import LeftMenu from './leftMenu'
import RightMenu from './rightMenu'
import { Drawer, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import '../style.scss';

class header extends Component {
	state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
        <nav className="menuBar">
        	<div className="logo">
        		<a href="">Catering Ibu</a>
        	</div>
        	<div className="menuCon">
        		<div className="leftMenu">
	        		<LeftMenu />
				    </div>
				    <div className="rightMenu">
	        			<RightMenu />
				    </div>
				    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
		          <span className="barsBtn"></span>
		        </Button>
				    <Drawer
		          title="Catering Ibu"
		          placement="right"
		          closable={false}
		          onClose={this.onClose}
		          visible={this.state.visible}
		        >
		          <LeftMenu/>
		          <RightMenu/>
		        </Drawer>

        	</div>
        </nav>
    );
  }
}

export default withRouter(header);