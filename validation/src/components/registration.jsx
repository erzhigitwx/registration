import React, { useEffect, useState } from 'react';


const Registration = function () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [wasEmail, setWasEmail] = useState(false)
    const [wasPassword, setWasPassword] = useState(false)
    const [emailError, setEmailError] = useState('email cannot be empty')
    const [passwordError, setPasswordError] = useState('password cannot be empty')
    const [valid, setValid] = useState(false)

    useEffect(() => {
        if(emailError || passwordError){
            setValid(false)
        } else {
            setValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value);
        const re = String(e.target.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!re){
            setEmailError('this email is incorrect')
        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,})");
        if(!strongRegex.test(e.target.value)){
            setPasswordError(<ul><strong>password must have:</strong>
            <li>at least 1 lowercase alphabetical character</li>
            <li>at least 1 uppercase alphabetical character</li>
            <li>at least 1 numeric character</li>
            <li>be four characters or longer</li></ul>)
        } else {
            setPasswordError('')
        }
    }

    const checkHandler = (e) => {
        switch(e.target.name){
            case 'email':
                setWasEmail(true);
                break;
            case 'password':
                setWasPassword(true);
                break;
        };
    }
    return(
        <form id='container'>
            <h1 className='title'>Registration</h1>
            {(wasEmail && emailError) && <div style={{color: 'red'}}>{emailError}</div> }
            <input onChange={emailHandler} name='email' value={email} onBlur={checkHandler} type='text' className='email' placeholder='type email...'></input>
            {(passwordError && wasPassword) && <div style={{color: 'red'}}>{passwordError}</div> }
            <input onChange={passwordHandler} name='password' value={password} onBlur={checkHandler} type='password' className='password' placeholder='type password...'></input>
            <button onClick={e => e.target.disabled=!valid} type='sumbit' className={valid ? 'btn btn-true' : 'btn btn-false'}>Registration</button>
        </form>
    );
  };


export default Registration;