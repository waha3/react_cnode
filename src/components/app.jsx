import React, { Component } from 'react'
import { Link } from 'react-router'
import { List, ListItem, Avatar, Subheader, Divider, FlatButton, CircularProgress } from 'material-ui'

const filter = (type) => {
  if(type == 'share') return '分享'
  if(type == 'job') return '招聘'
  if(type == 'ask') return '问答'
  if(type == 'good') return '精华'
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      lists: [],
      btnName:'点击加载',
      show: false
    }
  }

  componentDidMount() {
    fetch('https://cnodejs.org/api/v1/topics?page=' + this.state.page, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        this.setState({
          lists: data.data,
          page: this.state.page + 1
        })
    }).catch(err => console.error(err))
  }

  handleTouch() {
    this.setState({
      btnName: '正在加载...',
      show: true
    })
    fetch('https://cnodejs.org/api/v1/topics?page=' + this.state.page, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        this.setState({
          lists: this.state.lists.concat(data.data),
          page: this.state.page + 1,
          btnName: '点击加载',
          show: false
        })
    }).catch(err => {
      this.setState({
        btnName: '加载失败',
        show: false
      })
      console.error(err)
    })
  }

  render() {
    return (
      <div className="wrap">
        <Subheader>全部</Subheader>
        {
          this.state.lists.map((val, index) =>
            <Link to={'/topic/' + val.id } key={ index }>
              <List>
                <ListItem
                  leftAvatar={ <Avatar src={ val.author.avatar_url } /> }
                  rightIcon={ val.tab ?<div className="list_icon">{ filter(val.tab) }</div> :<div></div> }
                  primaryText={ val.title }
                  secondaryText={ val.author.loginname +'  '+ val.reply_count+'/'+val.visit_count }
                />
              </List>
              <Divider />
            </Link>
          )
        }
        <FlatButton
          label={ this.state.btnName }
          icon={
              <CircularProgress
                innerStyle={{
                  visibility: this.state.show ? 'visible' : 'hidden'
                }}
                className="circular_progress"
                size={0.3}
                color="rgb(0, 188, 212)"
              />
          }
          onClick={ () => this.handleTouch() }
          style={{
            width: '100%',
            color: '#333'
          }}/>
      </div>
    )
  }
}

export default App
