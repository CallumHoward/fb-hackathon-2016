import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { mount } from 'react-mounter';

import App from '../imports/client/App.jsx';

FlowRouter.route('/fbapp', {
  name: 'fbapp',
  action(params) {
    mount(SplashScreen);
    Meteor.setTimeout(() => {
      mount(App);
    }, 500);
  }
});

Meteor.startup(() => {
  // Font Noto Sans
  WebFontConfig = {
    google: { families: [ 'Noto+Sans:400,400italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
});
