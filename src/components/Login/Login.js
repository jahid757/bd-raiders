import React, { useContext, useState } from 'react';
import './Login.css'
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { firebaseAuth, signInWithFacebook, signInWithGoogle,createUserWithEmailAndPassword,signInWithEmailAndPassword } from './LoginSystem'
import { useHistory, useLocation } from 'react-router';



const Login = () => {
    const { register, watch, errors } = useForm();
    console.log(watch("example"))
    const onSubmit = data => console.log(data);
    const [message,setMessage] =useState('');
    const [user,setUser] = useState({
        isSignIn: true,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        photoURL: '',
        success:false
      })
    const [loginUser,setLoginUser] = useState({});
    const registerUser = () => {
        if(user.isSignIn === true) {
            user.isSignIn = false
        }else{
            user.isSignIn = true;
        }
        setLoginUser(user.isSignIn);
    }

    firebaseAuth()
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation()
    const { from } = location.state || { from: {pathname: "/"} };

    //Google Sign in
    const googleSignIn = () => {
        signInWithGoogle()
        .then(response => {
            setLoggedInUser(response)
            setUser(response)
            history.replace(from)
        })
    }
    const fbSignIn = () => {
        signInWithFacebook()
        .then(response => {
            setLoggedInUser(response)
            setUser(response)
            history.replace(from)
        })
    }

    const handelBlur = (e) => {
        let isFieldValid ;
        if(e.target.name === 'name'){
          isFieldValid = e.target.value
        }
        if (e.target.name === 'email') {
          isFieldValid = e.target.value;
        }
        if (e.target.name === 'password') {
          isFieldValid = e.target.value
        }
        if (isFieldValid) {
          const newUserInfo = {...user}
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo); 
        }
      }



    const emailSignIn = (e) => {
        if(loginUser === false && user.email && user.password){
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(response => {
            setLoggedInUser(response)
            setUser(response)
            setMessage('Registration')
            history.replace(from)
        })
        }
        if(loginUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                setLoggedInUser(response)
                setUser(response)
                setMessage('Login')
                history.replace(from)
            })
        }
        
        e.preventDefault();
    }
    
    return (
        <div className="login-form mt-5 rounded">
            {user.success ? <p className="text-success">{message} Successfully</p>: <p className="text-danger">{user.error}</p>}
            {loginUser ?

            <form onSubmit={emailSignIn}>
                <legend>Login</legend> 

                <input onBlur={handelBlur} name="email" type="email" ref={register({ required: true })} placeholder="Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                {errors.email && <small className="filedError">This field is required</small>}

                <input onBlur={handelBlur} name="password" type="password" ref={register({ required: true })} placeholder="Your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                {errors.password && <small className="filedError">This field is required</small>}

                <div className="d-flex justify-content-between">
                    <div className="remember">
                        <input type="checkbox" name="remember" id="remember"/>
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <div className="forget-password">
                        <p style={{cursor:'pointer'}} className="text-decoration-underline text-danger">Forget Password</p>
                    </div>
                </div>
                <input type="submit" value="Login"/>
            </form>
            : 
            <form onSubmit={emailSignIn}>
                <legend>Registration</legend>
                <input onBlur={handelBlur} name="name" type="text" ref={register({ required: true })} placeholder="Your Name"/>
                {errors.name && <small className="filedError">This field is required</small>}

                <input onBlur={handelBlur} name="email" type="email" ref={register({ required: true })} placeholder="Your Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                {errors.email && <small className="filedError">This field is required</small>}

                <input onBlur={handelBlur} name="password" type="password" ref={register({ required: true })} placeholder="Your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                {errors.password && <small className="filedError">This field is required</small>}

                <input onBlur={handelBlur} name="confirmPassword" type="password" ref={register({ required: true })} placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                {errors.confirmPassword && <small className="filedError">This field is required</small>}
        
                <input type="submit" value="Registration"/>
            </form>
            }

            <p>{loginUser ? "Don't have an account?":"Already have an account"} <span style={{cursor:'pointer'}} className="text-warning" onClick={registerUser}> {loginUser ? 'Create a new account':'Sign in' }</span></p>
            
            
            <button className="login-provider google" onClick={googleSignIn}><i className="fab fa-google"></i> Continue With Google</button>
            <button className="login-provider facebook" onClick={fbSignIn}><i className="fab fa-facebook"></i> Continue With Facebook</button>
        </div>
    );
};

export default Login;