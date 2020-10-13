import React, {useEffect, useState} from 'react';
import UserContext from '../app/UserContext';
import AuthBlock from './components/AuthBlock';
import UserInfoBlock from './components/UserInfoBlock';
import './Sidebar.css'


class Sidebar extends React.Component {
    static contextType = UserContext;

    state = { posts: [] };

    render() {
        const value = this.context;
        const sidebarContent = value.user ? <UserInfoBlock /> : <AuthBlock />

        return (
            <aside className='Sidebar'>
                {sidebarContent}
            </aside>
        )
    }
}

export default Sidebar;