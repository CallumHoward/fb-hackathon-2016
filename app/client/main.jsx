import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { mount } from 'react-mounter';

import App from '../imports/client/App.jsx';

FlowRouter.route('/post', {
  name: 'post',
  action(params) {
    mount(App);
  }
});
