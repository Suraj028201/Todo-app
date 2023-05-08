import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";
import { useProfile } from "../Context/ProfileContext";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {users, setIsLoggedIn} = useProfile();
  const [error, setError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add code for submitting login credentials to backend API here
    setIsSubmitting(true);
    let temp = true;
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 700));
    users.map((user) => {
       if(user.otherData.email === email && user.password === password){
        setError(false);
        localStorage.setItem('email', email);
        setIsSubmitting(false);
        temp = false;
        // console.log(`Submitting email ${email} and password ${password}`);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/dashboard');
       }
    })
    if(temp){
      console.log('pls enter valid data'); 
      setIsSubmitting(false);
      setError(true);
      setEmail('');
      setPassword('');
    }
  };

  const onEnterPressed = async (event: any) => {
       if(event.key === 'Enter'){
        handleSubmit(event);
       }
    }

return (
    <div className="login-page">
      <div className="login-background"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Log In</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} onKeyDown={onEnterPressed}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button className={`login-button${isSubmitting ? " submitting" : ""}`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
        {error && <span style={{color: 'red'}}>Please Enter Valid Credential</span>}
      </form>
    </div>
  );
};

export default Login;
