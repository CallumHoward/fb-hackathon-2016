import { Meteor } from 'meteor/meteor';

import serverIndex from '../imports/server/index.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Picker.route('/', serverIndex.indexRouteHandler);
