import React from 'react';
import './App.css';

class App extends React.Component {
  state = { users: [] }

  componentDidMount() {
    fetch('/users')
        .then(res => res.json())
        .then(users => this.setState({ users }))
        .catch(console.error);
  }

  render() {
    return (
        <div className="App">
          <h1 className="App-header">Users</h1>
          {this.state.users.map(user =>
              <div key={user.login}>{JSON.stringify(user)}</div>
          )}
        </div>
    );
  }
}

export default App;
