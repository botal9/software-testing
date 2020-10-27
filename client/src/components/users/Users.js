import React, {useEffect, useState} from 'react';
import './Users.css'

function Users() {
    const [state, setState] = useState({users: [], error: ''});
    const [content, setContent] = useState(<div/>);

    useEffect(() => {
        fetch('/api/v1/users/')
            .then(res => { if (res.ok) return res
                            else throw Error('Server error')})
            .then(res => res.json())
            .then(users => setState(state => ({...state, users: users})))
            .catch(error => setState(state => ({...state, error: error.message})));
    }, [])

    useEffect(() => {
        if (state.users.length === 0) {
            setContent(<div>{state.error}</div>);
        } else {
            state.error = '';
            setContent(
                <ul className='Users-list'>
                    {state.users.map((user, idx) =>
                        <li className='list-item' key={user.id}>
                            <div className='index'>
                                {idx + 1}.
                            </div>
                            <div className='username'>
                                {user.login}
                            </div>
                        </li>
                    )}
                </ul>
            );
        }
    }, [state])

    return (
        <div className='Users-container'>
            {content}
        </div>
    )
}

export default Users;