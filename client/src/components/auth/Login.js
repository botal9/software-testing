import React from 'react';
import UserContext from '../user-context/UserContext';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.login = props.match.params.login;
        this.password = props.match.params.password;

        this.ok = false;
        this.error = '';
        this.user = null;

        this.state = <div/>
    }

    async componentDidMount() {
        const user = await fetch(`/api/v1/users/${this.login}/${this.password}`)
            .then(response => {
                switch (response.status) {
                    case 200:
                        this.ok = true;
                        return response.json();
                    case 404:
                        throw Error('No such user');
                    default:
                        throw Error('Server error');
                }
            })
            .catch(err => this.error = err.message());

        if (this.ok && user != null) {
            this.context.login(user);
        }
    }

    render() {
        setTimeout(() => {
            if (this.ok) {
                this.setState(<Redirect to='/Feed'/>);
            } else {
                this.setState(<div>{this.error}</div>);
            }
        }, 1000);

        return this.state
    }
}

export default Login;