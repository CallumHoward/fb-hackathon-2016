import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'Stream token' },
      { _id: 2, text: 'URL' },
    ];
  }

  renderTasks() {
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  onButtonClick() {
    HTTP.post(
      'https://graph.facebook.com/v2.6/590615017770118/live_videos', 
      { params: 
        { access_token: '' }
      },
      function(err, res) {
        console.log(res);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Streamline <small>powered by Facebook Live</small></h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
        <button onClick={this.onButtonClick.bind(this)}>Button</button>
      </div>
    );
  }
}
