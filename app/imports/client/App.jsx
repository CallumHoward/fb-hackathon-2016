import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { streamToken: '', viewUrl: '', showInfo: false };
  }

  componentDidMount() {
    const secrets = Secrets.findOne({});
    let accessToken = undefined;

    if (secrets) {
      accessToken = secrets.accessToken;
    } else {
      accessToken = "";
    }

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

  renderTasks() {
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  onButtonClick() {
    this.setState({ showInfo: true });
  }

  render() {
    return (
      <div className="container">
        <header>
          <img width="400px" src="/streamline-logo.png"/>
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
              value={this.state.showInfo ? this.state.viewUrl : ''} readonly="true"
            />
          </li>
        </ul>

        <div style={{textAlign: 'center', width: '100%'}}>
          <button onClick={this.onButtonClick.bind(this)}>Start Stream</button>
        </div>
      </div>
    );
  }
}
