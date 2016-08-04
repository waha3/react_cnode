import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, CardHeader, CardTitle, CardText, List, ListItem, Avatar, Divider } from 'material-ui'
import RichEditor from './richeditor/index.jsx'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article_id: this.props.params.id,
      content: {
        title: '',
        loginname: '',
        avatar_url: '',
        archive: '',
        post_time: null,
        comments: []
      }
    }
  }

  componentDidMount() {
    fetch('https://cnodejs.org/api/v1/topic/' + this.state.article_id, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        this.setState({
          content: {
            title: data.data.title,
            loginname: data.data.author.loginname,
            avatar_url: data.data.author.avatar_url,
            post_time: 10,
            archive: data.data.content,
            comments: data.data.replies
          }
        })
    }).catch(err => console.error(err))
  }

  render() {
    return(
      <div>
        <Card className="card">
          <CardHeader
            title={ this.state.content.loginname }
            subtitle={ '发布于' + this.state.content.post_time }
            avatar={ <Link to={'/user/' + this.state.content.loginname }><Avatar src={ this.state.content.avatar_url } /></Link> }
          />
          <CardTitle title={ this.state.content.title } />
          <CardText dangerouslySetInnerHTML={{ __html: this.state.content.archive }}></CardText>
          <CardHeader
            title="评论"
          />
          {
            this.state.content.comments.map((val, index) =>
              <List key={ index }>
                <ListItem
                  leftAvatar={ <Link to={'/user/' + val.author.loginname }><Avatar title={ val.author.loginname } src={ val.author.avatar_url } /></Link> }
                  primaryText={ <div dangerouslySetInnerHTML={{__html: val.content }} /> }
                />
                <Divider inset={ true } />
              </List>
            )
          }
        </Card>
        <Card className="card">
          <RichEditor />
        </Card>
      </div>
    )
  }
}

export default Detail
