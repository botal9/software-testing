import React, {useEffect, useState} from 'react';
import AuthBlockHeader from './AuthBlockHeader';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function AuthBlock() {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const setSignInForm = () => {
        setIsSignInForm(true);
    }

    const setSignUpForm = () => {
        setIsSignInForm(false);
    }

    const props = {isSignInForm, setSignInForm, setSignUpForm};

    let form = isSignInForm ? <SignInForm {...props} /> : <SignUpForm {...props} />;

    useEffect(() => {
        form = isSignInForm ? <SignInForm {...props} /> : <SignUpForm {...props} />;
    }, [isSignInForm])

    return (
        <section className='AuthBlock'>
            <AuthBlockHeader {...props} />
            {form}
        </section>
    )
}

export default AuthBlock;