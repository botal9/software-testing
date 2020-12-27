import React from 'react';
import {Redirect} from 'react-router-dom';
import UserContext from '../user-context/UserContext';
import {useHistory} from "react-router-dom";
import './PostForm.css'

function PostForm() {
    let history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const post = {
            title: event.target[1].value,
            text: event.target[2].value,
            author: event.target[0].value,
        }

        await fetch(`/api/v1/posts/add-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        });
        history.push('/Feed');
    }

    return (
        <UserContext.Consumer>
            {value =>
                value.user
                    ? <div className='PostForm-wrapper'>
                        <form className='PostForm' onSubmit={handleSubmit}>
                            <input type='hidden' name='author' value={value.user.login}/>
                            <input className='PostForm-title' type='text' placeholder="Title"/>
                            <textarea className='PostForm-text' placeholder="Text"/>
                            <button className='submit-btn' type='submit'>Add Post</button>
                        </form>
                      </div>
                    : <Redirect to='/Feed'/>
            }
        </UserContext.Consumer>
    )
}

export default PostForm;
