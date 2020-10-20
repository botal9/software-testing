import UserContext from '../../app/UserContext';
import React from 'react';
import {Link} from 'react-router-dom';

function UserInfoBlock() {
    return (
        <UserContext.Consumer>
            {value =>
                <section className='UserInfoBlock'>
                    <div className='UserInfoBlock__header'>
                        <div className='avatar'></div>
                        <div className='user'>
                            <div className='user-login'>{value.user.login}</div>
                            <div className='logout' onClick={() => value.logout()}>logout</div>
                        </div>
                    </div>
                    <div className='UserInfoBlock__user-info-list'>
                        <Link className='list-item posts' to='/Posts'>Posts</Link>
                        <Link className='list-item comments' to='/Comments'>Comments</Link>
                    </div>
                </section>
            }
        </UserContext.Consumer>
    )
}

export default UserInfoBlock;