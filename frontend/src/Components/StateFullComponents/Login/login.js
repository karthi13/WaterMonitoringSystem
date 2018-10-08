import React from 'react';
import { Link } from 'react-router-dom';
// import { Container, Row, Col, Input, Button } from 'mdbreact';
import './login.css';
class LoginPage extends React.Component {
    render() {
        return (

                <div className="container">
                    <h1>Smart Water Monitoring System</h1>
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                        <p id="profile-name" className="profile-name-card"></p>
                        <form className="form-signin">
                            <span id="reauth-email" className="reauth-email"/>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <div id="remember" className="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                        </form>
                        <a href="#" className="forgot-password">Forgot the password?</a>
                        <Link to="/register" className="forgot-password">Register</Link>
                    </div>
                </div>
                
        );
    }
};
                    
export default LoginPage;
                    
