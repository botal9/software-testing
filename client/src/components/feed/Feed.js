import React, {useEffect, useState} from 'react';
import Post from '../post/Post';
import './Feed.css'

function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('/api/v1/posts/')
            .then(res => res.json())
            .then(posts => setPosts(posts))
            .catch(console.error);
    }, [])

    return (
        <div className='Feed-container'>
            {posts.map(post =>
                <Post key={post.postId} post={post}/>
            )}
        </div>
    )
}

export default Feed;