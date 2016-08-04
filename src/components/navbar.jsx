import React, { Component } from 'react'
import { IndexLink } from 'react-router'
import { AppBar, IconButton, IconMenu, MenuItem, Drawer } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Login from './login.jsx'

const text_indent = {
  'textIndent': '4em'
}

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'CNodejs 专业的中文社区',
      open: false,
      loginShow: false
    }
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClick() {
    this.setState({
      loginShow: true
    })
  }

  onChildChanged() {
    this.setState({
      loginShow: false
    })
  }
  
  render() {
    return (
      <div>
        <AppBar
          className="nav"
          title={ <IndexLink to="/">{ this.state.title }</IndexLink> }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem onClick={() => this.handleClick()} primaryText="登录" props={this.state.loginShow} />
            </IconMenu>
          }
          onLeftIconButtonTouchTap={ this.handleToggle.bind(this) }
        />
        <Drawer
          open={ this.state.open }
          docked={ false }
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem style={ text_indent }>全部</MenuItem>
          <MenuItem style={ text_indent }>精华</MenuItem>
          <MenuItem style={ text_indent }>分享</MenuItem>
          <MenuItem style={ text_indent }>问答</MenuItem>
          <MenuItem style={ text_indent }>招聘</MenuItem>
        </Drawer>
        <Login
          open={ this.state.loginShow }
          callbackParent={ () => this.onChildChanged() }
        />
        <div className="container">{ this.props.children }</div>
      </div>
    )
  }
}

export default Navbar
