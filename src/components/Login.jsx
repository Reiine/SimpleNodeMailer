import axios from 'axios';
import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState('')
    const handleEmail = (e) =>{
        setEmail(e)
    }
    const handlePass = (e) =>{
        setPass(e)
    }

    async function submit() {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email,
                pass
            });
            const data = response.data;
            if (data === 'passerror') {
                alert('You have entered the wrong password. Please check and try again.');
            } else if (data === 'unverified') {
                alert('We have sent you a confirmation email. Please verify to login.');
            } else if (data === 'nouserexist') {
                alert("We can't find user with that email. Please check your spelling or register.");
                
            } else if (data.message === 'logsuccess') {
                setIsLogin(false);
            }
            setName(data.name);
        } catch (error) {
            console.log('error sending data:', error);
        }
    }
    
    const handleRoute = () =>{
        setIsLogin(true)
        navigate('/login')
    }
    return ( 
        <>
            {(isLogin)?
                <div className="register-cover">
                    <div className="form">
                        <h1>Login</h1>
                        <hr />
                        <label htmlFor="email">Email: </label><br />
                        <input type="email" onChange={(e)=>handleEmail(e.target.value)} /><br />
                        <label htmlFor="password">Password: </label><br />
                        <input type="password" onChange={(e)=>handlePass(e.target.value)} /><br />
                        <button id='log-btn' onClick={submit} >Login</button><br />
                        <Link id='forgot-password' to={'/forgot-password'}>Forgot Password?</Link><br />
                        <hr />
                        <Link to='/'>Don't have an account? Signup.</Link>
                    </div>
                </div>
                :
                    <div className="dash-cover">
                        <h1>Hello {name}!</h1>
                        <Link onClick={handleRoute}>Sign out</Link>
                    </div>
            }
        </>
     );
}

export default Login;