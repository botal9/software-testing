import React from 'react';
import UserContext from '../app/UserContext'
import {Link} from 'react-router-dom';
import './Header.css'
import logo from '../../images/pikachu-min.png'

function Header() {
    return (
        <UserContext.Consumer>
            {value =>
                <header className='Header'>
                    <Link to='/'>
                        <img src={logo} className='Header-logo' alt='Pikachu logo'/>
                        <div className='Header-site-name'>
                            <span>pikachu</span>
                        </div>
                    </Link>
                    <nav>
                        <ul className='nav-links'>
                            <li><Link to='/Feed'>Feed</Link></li>
                            <li><Link to='/Users'>Users</Link></li>
                            {value.user &&
                            <>
                                <li><Link to='/AddPost'>Add Post</Link></li>
                                <li><Link to='/Posts'>My Posts</Link></li>
                            </>
                            }
                        </ul>
                    </nav>
                </header>
            }
        </UserContext.Consumer>
    )
}

export default Header;