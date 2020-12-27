import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import UserContext from '../user-context/UserContext'
import MockContent from '../main-content/MockContent';
import Sidebar from '../sidebar/Sidebar';
import Feed from '../feed/Feed';
import UserPosts from '../user-posts/UserPosts';
import Users from '../users/Users';

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

    render() {
        return (
            <div className='App'>
                <UserContext.Provider value={this.state.userState}>
                    <Router>
                        <Header/>
                        <div className='content-wrapper'>
                            <div className='content'>
                                <main>
                                    <Switch>
                                        <Route path='/Comments' component={MockContent}/>
                                        <Route path='/Feed' component={Feed}/>
                                        <Route path='/Post/:id' component={MockContent}/>
                                        <Route path='/Posts'
                                               component={() => <UserPosts user={this.state.userState.user}/>}
                                        />
                                        <Route path='/Users' component={Users}/>
                                        <Redirect from='/' to='/Feed'/>
                                    </Switch>
                                </main>
                                <Sidebar/>
                            </div>
                        </div>
                    </Router>
                </UserContext.Provider>
            </div>
        )
    }
}

export default App;
