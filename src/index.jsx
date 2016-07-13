import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider } from 'material-ui'
import './styles/App.less'

import App from './components/app.jsx'
import Detail from './components/detail.jsx'
import Login from './components/login.jsx'
import Register from './components/register.jsx'

injectTapEventPlugin()

const RouterTree = () => (
  <MuiThemeProvider>
    <Router history={ hashHistory } >
        <Route path="/" component={ App } />
        <Route path="/topic/:id" component={ Detail } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
    </Router>
  </MuiThemeProvider>
)

render((
  <RouterTree />
),
  document.querySelector('#app')
)