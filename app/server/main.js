import { Meteor } from 'meteor/meteor';

import serverIndex from '../imports/server/index.js';

Meteor.startup(() => {
  const hasSecrets = Secrets.findOne({});
  if (!hasSecrets) {
    Secrets.insert({ accessToken: process.env.ACCESS_TOKEN });
  }
});

Picker.route('/', serverIndex.indexRouteHandler);
