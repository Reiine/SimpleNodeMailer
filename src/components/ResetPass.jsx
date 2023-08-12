import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function ResetPass() {
    const navigate = useNavigate();
    const [pass, setPass] = useState('')
    const [cpass , setcPass] = useState('');
    const { token } = useParams();
    const handlePass = (e) =>{
        setPass(e)
    }
    const handleCPass = (e) =>{
        setcPass(e)
    }
    useEffect(()=>{
        console.log(token);
    },[token])
    async function submit (){
        if(pass===cpass){
            try {
                await axios.post('http://localhost:3001/reset-pass',{
                    pass
                },{params: {
                    token: token
            }})
            .then((res)=>{
                (res.data==='success'&& alert('Successfully changed your password! Please login.'))
                navigate('/login');
            })
            } catch (error) {
                console.log('error reseting password');
            }
        }else{
            alert("Password doesn't match. Please check again.")
        }
    }
    return ( 
        <div className="register-cover">
            <div className="form">
                <h1 className='f-p'>Reset Password</h1>
                <hr />
                <label htmlFor="password">Password: </label><br />
                <input type="password" onChange={(e)=>handlePass(e.target.value)} /><br />
                <label htmlFor="cpassword">Confirm Password: </label><br />
                <input type="password" onChange={(e)=>handleCPass(e.target.value)} /><br />
                <button id='log-btn' onClick={submit} >Confirm</button><br />
            </div>
        </div>
     );
}

export default ResetPass;