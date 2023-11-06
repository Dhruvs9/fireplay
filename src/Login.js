import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const signIn = e => {
    e.preventDefault();
    //some fancy firebase login
    auth.signInWithEmailAndPassword(email, password)
    .then(auth => {
        history.push('/')
    })
    .catch(error => alert(error.message))

}
const register = e => {
    e.preventDefault();
    //some fancy firebase register
    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) => {
        //succesfully created user
        if (auth){
            history.push('/')
        }
    })
    .catch(error => alert(error.message))
}

    return (
        <div className='login'>
            
            <div className="login_container">
                <h1>Sign in</h1>
                <form>
                   <h5>E-mail</h5> 
                   <input type='text' value={email} 
                   onChange={e => setEmail(e.target.value)}/>

                   <h5>Password</h5>
                   <input type='password' value={password} 
                   onChange={e => setPassword(e.target.value)}/> 

                   <button type="submit" onClick={signIn} className='login_SignInButton'>Sign In</button>
                </form>
                <p>By continuing, you agree to Play Fires's Conditions of Use and Privacy Notice.</p>

                <button onClick={register} className='login_RegisterButton'>Create your Play Fire Account</button>
            </div>
        </div>
    )
}

export default Login

//<Link to='/'>
//<img className="login_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG21.png" alt='Logo'/>
//</Link>