import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function MainPage(props){
    const[valid,setValid]=useState('pending') //valid - hold wheather the jwt is verified or not
    //useEffect - verify the jwt from localStorage if exist.
    useEffect(()=>{
        if(localStorage.getItem('token')){
            axios.post('http://localhost:8080/verifyUser',{
                token:localStorage.getItem('token')
            })
            .then(result=>setValid('Success'))
            .catch(err=>setValid('Failure'))
        }
    },[])
    //logout - remove the jwt from localstorage and redirect to login page
    const logout=()=>{
        localStorage.removeItem('token')
        props.history.push('/Login')
    }
    //1.Check if token exist
    //2.If exist verifying the token
    //3.If any of the above 2 condition fail then redirect to login page.
    return(
        <>
            {localStorage.getItem('token')?
                valid==='Success'?
                <div id='mainPageSection'>
                    <h1>You are in Secure Route</h1>
                    <button id='logout' onClick={logout}>Button</button>
                </div>:
                valid==='Failure' && <Redirect to='/Login'></Redirect>:
            <Redirect to='/Login'></Redirect>
            }
        </>
    )
}