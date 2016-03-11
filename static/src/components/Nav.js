import Backbone from 'backbone';
import React from 'react';
import { Menu } from 'antd';

export default React.createClass({
  propTypes: {
    current: React.PropTypes.string,
    isAdmin: React.PropTypes.bool
  },

  getDefaultProps() {
      return {
          current: '',
          isAdmin: false
      };
  },

  getInitialState() {
    return { current: this.props.current };
  },

  componentDidMount() {

  },

  componentWillReceiveProps(nextProps) {
    this.setState({ current: nextProps.current });
  },

  handleClick(e) {
    Backbone.history.navigate(`!/${e.key}`, { trigger: true });
  },

  render() {
      console.log(this.props.isAdmin);

     const style = {
         display: this.props.isAdmin ? 'block' : 'none'
     }
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        theme=""
        mode="horizontal"
      >
        <Menu.Item style={style} key="user">用户列表</Menu.Item>
        <Menu.Item style={style} key="oauth">OAuth列表</Menu.Item>
        <Menu.Item key="personal">个人信息</Menu.Item>
      </Menu>
    );
  },
});
