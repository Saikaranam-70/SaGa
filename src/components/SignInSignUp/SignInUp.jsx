import React, { useState } from 'react';
import './SignInUp.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const SignInUp = () => {
    const [registerActive, setRegisterActive] = useState(false)
    

    const toggleLoginActive = ()=>{
        registerActive? setRegisterActive(false) : setLoginActive(true);
    }
    const toggleRegisterActive = ()=>{
        registerActive ? setRegisterActive(false): setRegisterActive(true)
    }
  return (
    <div className={`container ${registerActive? 'active': ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="text"  placeholder='Phone Number'/>
          <button type="submit" >Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Submit your personal details to gain complete access to the site.</p>
            <button className="hidden" id="login" onClick={toggleLoginActive}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Join now to enjoy all the functionalities we offer.</p>
            <button className="hidden" id="register" onClick={toggleRegisterActive}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;
