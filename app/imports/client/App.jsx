import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { streamToken: '', viewUrl: '' };
  }

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
    const accessToken = Secrets.findOne({}).accessToken;
    HTTP.post(
      'https://graph.facebook.com/v2.6/856086361161946/live_videos', 
      { params: 
        { access_token: accessToken }
      },
      (err, res) => {
        console.log(res);
        if (res.data) {
          const streamUrl = res.data.secure_stream_url;
          const streamToken = streamUrl.substring(streamUrl.lastIndexOf('/')+1);
          const streamId = res.data.id;
          HTTP.get(
            'https://graph.facebook.com/v2.6/'+streamId,
            { params: { fields: 'permalink_url', access_token: accessToken } },
            (err, res2) => {
              if (res2.data) {
                const viewUrl = 'https://www.facebook.com' + res2.data.permalink_url;
                this.setState({ viewUrl });
                console.log(res2);
              }
            }
          );
          this.setState({ streamToken });
        }
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
          <li>
            <span style={{width: '140px', display: 'inline-block', textAlign: 'right'}}>Stream Token:</span>
            <input className="text" type="text"
              value={this.state.streamToken} readonly="true"
            />
          </li>
          <li>
            <span style={{width: '140px', display: 'inline-block', textAlign: 'right'}}>URL:</span>
            <input className="text" type="text" 
              value={this.state.viewUrl} readonly="true"
            />
          </li>
        </ul>

        <button onClick={this.onButtonClick.bind(this)}>Button</button>
      </div>
    );
  }
}
