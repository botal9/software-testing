import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import UserContext from './UserContext'
import MainContent from '../main-content/MainContent';
import Sidebar from '../sidebar/Sidebar';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userState: {
                user: null,
                login: this.login,
                logout: this.logout
            }
        }
    }

    login = (user) => {
        this.setState({
            userState: {
                ...this.state.userState,
                user: user
            }
        });
    }

    logout = () => {
        this.setState({
            userState: {
                ...this.state.userState,
                user: null
            }
        });
    }

    // componentDidMount() {
    //     fetch('/users')
    //         .then(res => res.json())
    //         .then(users => this.setState({ users }))
    //         .catch(console.error);
    //     fetch('/posts')
    //         .then(res => res.json())
    //         .then(posts => this.setState({ posts }))
    //         .catch(console.error);
    // }

    render() {
        return (
            <div className='App'>
                <UserContext.Provider value={ this.state.userState }>
                    <Router>
                        <Header />
                        <div className='content-wrapper'>
                            <div className='content'>
                                <main>
                                    <Switch>
                                        <Route path='/' exact component={MainContent}/>
                                        <Route path='/Feed' component={MainContent}/>
                                        <Route path='/Post/:id' component={MainContent}/>
                                    </Switch>
                                </main>
                                <Sidebar />
                            </div>
                        </div>
                    </Router>
                </UserContext.Provider>
            </div>
        )
    }
}

export default App;
