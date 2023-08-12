import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');

    
    const handleName = (e)=>{
        setName(e)
    }
    const handleEmail = (e)=>{
        setEmail(e)
    }
    const handlePass = (e)=>{
        setPass(e)
    }

    async function submit(){
        try {
            await axios.post('http://localhost:3001/register',{
                name,email,pass
            })
            .then((res)=>{
                (res.data==='regsuccess' && alert('Registration successful! Please confirm your email to login.'))
            })
            navigate('/login')
        } catch (error) {
            
        }
    }

    return ( 
        <div className="register-cover">
            <div className="form">
                <h1>Register</h1>
                <hr />
                <label htmlFor="name">Name: </label><br />
                <input type="text" onChange={(e)=>handleName(e.target.value)} /><br />
                <label htmlFor="email">Email: </label><br />
                <input type="email" onChange={(e)=>handleEmail(e.target.value)} /><br />
                <label htmlFor="password">Password: </label><br />
                <input type="password" onChange={(e)=>handlePass(e.target.value)} /><br/>
                <button onClick={submit}>Sign Up</button><br />
                <Link to='/login'>Already registered? Login.</Link>
            </div>
        </div>
     );
}

export default Register;