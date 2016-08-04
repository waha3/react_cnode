import React, { Component } from 'react'
import { TextField, Dialog, FlatButton } from 'material-ui'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accesstoken: '',
      textValue: ''
    }
  }

  handleChange(e) {
    this.setState({
      textValue: e.target.value
    })
  }

  handleClose() {
    this.props.callbackParent()
  }

  postAccessToken() {
    fetch('https://cnodejs.org/api/v1/accesstoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accesstoken: this.state.textValue })
    }).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(err => console.error(err))
  }

  render() {
    return (
      <div>
        <Dialog
          title="登录"
          actions={
            <div>
              <FlatButton
                label="取消"
                onClick={ () => this.handleClose() }
              />
              <FlatButton
                label="确定"
                onClick={ () => this.postAccessToken() }
              />
            </div>
          }
          modal={ true }
          open={ this.props.open }
          onRequestClose={ () => this.handleClose() }
        >
          <TextField
            hintText="请输入accesstoken"
            onChange={ (e) => this.handleChange(e) }
            value={ this.state.textValue }
          />
        </Dialog>
      </div>
    )
  }
}

export default Login
