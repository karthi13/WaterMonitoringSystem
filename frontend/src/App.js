import React, { Component } from 'react';
// import NavbarComponent from './Components/StateFullComponents/Navbar/navbar';
import {  Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import LoginPage from './Components/StateFullComponents/Login/login';
import RegistrationPage from './Components/StateFullComponents/Registration/register';

library.add(faStroopwafel);

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/register" component={RegistrationPage} />
            </div>
        );
    }
}

export default App;
