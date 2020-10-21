import React, {useEffect, useState} from 'react';
import Post from '../post/Post';

function UserPosts({user}) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user === undefined ||
            user === null ||
            typeof user.login !== 'string') {
            return
        }

        fetch(`/api/v1/posts/by-user/${user.login}`)
            .then(res => res.json())
            .then(posts => setPosts(posts))
            .catch(setError);
    }, [])

    if (posts.length === 0) {
        if (error.length === 0)
            setError('No posts found');
        return <div>{error}</div>
    }

    return (
        <div className='Feed-container'>
            {posts.map(post =>
                <Post key={post.postId} post={post}/>
            )}
        </div>
    )
}

export default UserPosts;