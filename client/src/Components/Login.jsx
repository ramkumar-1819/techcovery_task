import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login(props){
    //loginUser - perform client side validation and perform sideeffect to check user credintials are valid or not.
    const loginUser=(e)=>{
        e.preventDefault()
        const userName=document.getElementById('username')
        const password=document.getElementById('password')
        axios.post('http://localhost:8080/signinUser',{
            userName:userName.value,
            password:password.value
        })
        .then(result=>{
            localStorage.setItem('token',result.data.token)
            props.history.push('/MainPage')
        })
        .catch(err=>alert(err.response.data))
    }
    return(
            <form className='authPage' id='LoginForm' onSubmit={loginUser}>
                <h2>Sign-In</h2>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input type="text" id="username" required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required/>
                </div>
                <button type='submit' className='authButton'>Login</button>
                <span>Not a member then , <Link to='/Signup'>Signup</Link></span>
            </form>
    )
}
