import UserContext from '../../app/UserContext';
import React from 'react';

function UserInfoBlock() {
    return (
        <UserContext.Consumer>
            {value =>
                <section className='UserInfoBlock'>
                    <div className='Sidebar-block__header'>{value.user.login}</div>
                    <div className='Sidebar-block__content'>

                    </div>
                </section>
            }
        </UserContext.Consumer>
    )
}

export default UserInfoBlock;