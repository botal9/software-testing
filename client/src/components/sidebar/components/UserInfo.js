import UserContext from '../../app/UserContext';
import React from 'react';
import {Link} from 'react-router-dom';
import './UserInfo.css'

function UserInfo() {
    return (
        <UserContext.Consumer>
            {value =>
                <section className='UserInfo'>
                    <div className='UserInfo-header'>
                        <div className='avatar'>
                        </div>
                        <div className='user'>
                            <div className='user-login'>{value.user.login}</div>
                            <div className='logout' onClick={() => value.logout()}>logout</div>
                        </div>
                    </div>
                    <ul className='UserInfo-actions-list'>
                        <li><Link className='list-item posts' to='/Posts'>Posts</Link></li>
                        <li><Link className='list-item comments' to='/Comments'>Comments</Link></li>
                    </ul>
                </section>
            }
        </UserContext.Consumer>
    )
}

export default UserInfo;