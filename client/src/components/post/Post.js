import React from 'react';
import './Post.css'

function Post({post}) {
    return (
        <article className='Post'>
            <div className='Post-main'>
                <header className='Post-header'>
                    <h2 className='Post-title'>{post.title}</h2>
                </header>
                <div className='Post-content'>
                    <p>{post.text}</p>
                </div>
                <footer className='Post-footer'>{post.author}</footer>
            </div>
        </article>
    )
}

export default Post;