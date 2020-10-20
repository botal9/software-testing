import React from 'react';
import './Post.css'

function Post({post}) {
    return (
        <article className='Post'>
            <div className='Post-main'>
                <header className='Post-header'>{post.title}</header>
                <div className='Post-content'>
                    {post.text}
                </div>
                <footer className='Post-footer'>{post.author}</footer>
            </div>
        </article>
    )
}

export default Post;