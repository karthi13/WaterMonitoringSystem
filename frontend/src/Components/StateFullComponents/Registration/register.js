import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Button, Card, CardBody } from 'mdbreact';
import './register.css';

export default class RegistrationPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }

    this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
  }

  onRegisterFormSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/register', this.state)
      .then((response) => {
        console.log(response);
      });
    console.log(this.state);
  }

  render() {
    return (
      <Container >
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <Card>
              <CardBody>
                <form>
                  <p className="h4 text-center py-4">Sign up</p>
                  <div className="grey-text">
                    <Input name="first_name" 
                           value={this.state.first_name} 
                           onChange={(e) => this.setState({
                            first_name: e.target.value
                           })}
                           label="First name" 
                           icon="user" 
                           group type="text" 
                           validate error="wrong" 
                           success="right" />
                    <Input name="last_name" 
                           value={this.state.last_name} 
                           onChange={(e) => this.setState({
                            last_name: e.target.value
                           })}
                           label="Last name" 
                           icon="user" 
                           group type="text" 
                           validate error="wrong" 
                           success="right" />
                    <Input name="email" 
                           value={this.state.email} 
                           onChange={(e) => this.setState({
                            email: e.target.value
                           })}
                           label="Email" 
                           icon="envelope" 
                           group type="email" 
                           validate error="wrong" 
                           success="right" />
                    <Input name="password" 
                           value={this.state.password} 
                           onChange={(e) => this.setState({
                            password: e.target.value
                           })}
                           label="Password" 
                           icon="lock" 
                           group type="password" 
                           validate />
                    <Input name="phone_num" 
                           label="Phone no" 
                           icon="user" 
                           group type="text" 
                           validate error="wrong" 
                           success="right" />
                  </div>
                  <div className="text-center py-4 mt-3">
                  <Button onClick={(e) => this.onRegisterFormSubmit(e)}color="cyan" type="submit">Register</Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};
