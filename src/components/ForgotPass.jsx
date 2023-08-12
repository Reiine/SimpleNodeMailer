import axios from 'axios';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function ForgotPass() {
    const [email , setEmail] = useState('');
    const handleEmail = (e) =>{
        setEmail(e)
    }
    async function submit(){
        try {
            const response = await axios.post('http://localhost:3001/forgot-pass',{
            email
        })
        const data= response.data;
            (data==='nouserexist' && alert('No user with this email exists. Please check and try again.'))
            (data==='success'&& alert('We have sent you an email to change your password!'))
        } catch (error) {
            console.log('error')
        }
    }
    return ( 
        <div className="register-cover">
            <div className="form">
                <h1 className='f-p'>Forgot Password?</h1>
                <hr />
                <label htmlFor="email">Email: </label><br />
                <input type="email" onChange={(e)=>handleEmail(e.target.value)} /><br />
                <p>An email will be sent to this email id to change your password.</p>
                <button id='log-btn' onClick={submit}>Confirm</button><br />
                <Link to='/login'>Return to login page.</Link>
            </div>
        </div>
     );
}

export default ForgotPass;