import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup(props){
    //registerUser - perform client side validation and perform sideeffect to store user credintials.
    const registerUser=(e)=>{
        e.preventDefault()
        const userName=document.getElementById('username')
        const password=document.getElementById('password')
        const retypedPassword=document.getElementById('re-password')
        console.log(userName.value)
        if(!/^\w{8,15}$/g.test(userName.value)){
            alert('Username Should contain alphabets and numbers and length 8-15')
            userName.focus()
            return
        }
        if(password.value!==retypedPassword.value){
            alert('Password is Not matching')
            password.focus()
            return
        }
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password.value)){
            alert('Enter a Strong Password')
            password.focus()
            return
        }
        axios.post('http://localhost:8080/registerUser',{
            userName:userName.value,
            password:password.value
        })
        .then(result=>{
            alert('Signup Success Login to Continue')
            props.history.push('/Login')
        })
        .catch(err=>{
            alert(err.response.data)
        })
    }
    return(
        <form className='authPage' id='SignupForm' onSubmit={registerUser}>
                <h2>Sign-Up</h2>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required />
                </div>
                <div>
                    <label htmlFor="re-password">Retype-Password</label>
                    <input type="password" id="re-password" required/>
                </div>
                <button type='submit' className='authButton'>Register</button>
                <span>Already a member then , <Link to='/Login'>Login</Link></span>
            </form>
    )
}