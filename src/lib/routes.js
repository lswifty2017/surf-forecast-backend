'use strict';
const Path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/swellnet-reports',
    handler: (request, h) => {
      return 'All the notes will appear here';
    },
    config: {
      description: 'Gets all the notes available'
    }
  }
];
