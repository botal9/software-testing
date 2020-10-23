import React from 'react';
import UserContext from '../user-context/UserContext';
import AuthBlock from './components/AuthBlock';
import UserInfo from './components/UserInfo';
import './Sidebar.css'


class Sidebar extends React.Component {
    static contextType = UserContext;

    state = {posts: []};

    render() {
        const value = this.context;
        const sidebarContent = value.user ? <UserInfo/> : <AuthBlock/>

        return (
            <aside className='Sidebar'>
                <div className='Sidebar-block'>
                    {sidebarContent}
                </div>
            </aside>
        )
    }
}

export default Sidebar;