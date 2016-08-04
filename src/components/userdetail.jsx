import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { Card, CardHeader, CardText, Divider} from 'material-ui'

moment.locale('zh-cn')  //初始语言汉语
const github = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4='

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.params.name,
      content: {},
      recent_topics: [],
      recent_replies: []
    }
  }

  componentDidMount() {
    fetch('https://cnodejs.org/api/v1/user/' + this.state.username, {
      method: 'GET'
    }).then(res => res.json()).then(data => {
      this.setState({
        content: data.data,
        recent_topics: data.data.recent_topics,
        recent_replies: data.data.recent_replies
      })
    }).catch(err => console.error(err))
  }

  render() {
    console.log(this.state.recent_topics)
    return (
      <div>
        <Card className="card">
          <CardHeader
            title={ this.state.content.loginname }
            subtitle={ '积分：' + this.state.content.score }
            avatar={ this.state.content.avatar_url }
          />
          <a className="github" href={'https://github.com/' + this.state.content.loginname }>
            <img src={ github } />
          </a>
          <CardText>
            注册时间: { moment(this.state.content.create_at).fromNow() }
          </CardText>
        </Card>
        <Card className="card">
          <CardHeader
            title="最近创建的话题"
            className="bg_g"
          />
          {
            this.state.recent_topics.map((val, i) =>
              <Link to={'/topic/' + val.id } key={ i }>
                <CardText>
                  <div>{ val.title }</div>
                </CardText>
                <Divider />
              </Link>
            )
          }
        </Card>
        <Card className="card">
          <CardHeader
            title="最近参与的话题"
            className="bg_g"
          />
          {
            this.state.recent_replies.map((val, i) =>
              <Link to={'/topic/' + val.id } key={ i }>
                <CardText>
                  <div>{ val.title }</div>
                </CardText>
                <Divider />
              </Link>
            )
          }
        </Card>
      </div>
    )
  }
}

export default User
