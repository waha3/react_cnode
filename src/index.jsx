import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute} from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider } from 'material-ui'

import './styles/App.less'

import App from './components/app.jsx'
import Detail from './components/detail.jsx'
import Navbar from './components/navbar.jsx'
import User from './components/userdetail.jsx'

injectTapEventPlugin()

const RouterTree = () => (
  <MuiThemeProvider>
    <Router history={ browserHistory }>
        <Route path="/" component={ Navbar }>
          <IndexRoute component={ App }/>
          <Route path="topic/:id" component={ Detail } />
          <Route path="user/:name" component={ User } />
        </Route>
    </Router>
  </MuiThemeProvider>
)

render((
    <RouterTree />
),
  document.querySelector('#app')
)
