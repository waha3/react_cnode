/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const path = require('path');
// const open = require('open');

let server = new WebpackDevServer(webpack(config), {
  publicPath: './src'
})

server.app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

server.listen(3000, () => {
  console.log('this port is 3000')
})

// server.listen(config.port, 'localhost', (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at localhost:' + config.port);
//   console.log('Opening your system browser...');
//   open('http://localhost:' + config.port + '/webpack-dev-server/');
// });
