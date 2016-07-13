import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardText, List, ListItem, Avatar, Divider} from 'material-ui'

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
        <Card>
          <CardHeader
            title={ this.state.content.loginname }
            subtitle={ '发布于' + this.state.content.post_time }
            avatar={ this.state.content.avatar_url }
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
                  leftAvatar={ <Avatar title={ val.author.loginname } src={ val.author.avatar_url } /> }
                  primaryText={ <div dangerouslySetInnerHTML={{__html: val.content }} /> }
                />
                <Divider inset={ true } />
              </List>
            )
          }
        </Card>

      </div>
    )
  }
}

export default Detail
