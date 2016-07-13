import React, { Component } from 'react'
import { Link } from 'react-router'
import { List, ListItem, Avatar, Subheader, Divider, AppBar, IconButton, IconMenu, MenuItem, Drawer} from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'CNodejs 专业的中文社区',
      lists: []
    }
  }

  componentDidMount() {
    fetch('https://cnodejs.org/api/v1/topics', {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        this.setState({
          lists: data.data
        })
    }).catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <AppBar
          title={ this.state.title }
          iconElementLeft={

          }
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to="/login"><MenuItem primaryText="注册" /></Link>
              <Link to="/register"><MenuItem primaryText="登录" /></Link>
            </IconMenu>
        }
        />
        <Subheader>全部</Subheader>
        {
          this.state.lists.map((val, index) =>
            <Link to={'/topic/' + val.id } key={ index }>
              <List>
                <ListItem
                  leftAvatar={ <Avatar src={ val.author.avatar_url } /> }
                  primaryText={ val.title }
                  secondaryText={ val.author.loginname }
                />
                <Divider inset={ true } />
              </List>
            </Link>
          )
        }
      </div>
    )
  }
}


export default App
